import { LayoutOption } from '../../controller/layout/defaultLayouts';
import ForceLayout from '../force/ForceLayout';
import { optimizeDrawingByNode } from '../../perf/optimizeDrawing';

import { LayoutOptionBase, Data, Node as NodeType, ForceSimulation, ExtendedGraph, Graph } from '../../types';

import { ForceProps } from '../force/ForceLayout';
/** web worker*/
import Point from '../force/Point';
import Vector from '../force/Vector';
import Spring from '../force/Spring';
import { getDegree } from '../utils/graph';
import { Node, Edge } from '../force/Elements';
import workerFunction from './worker';

const babelDepString = [
  `function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  var  _objectSpread2 = Object.assign
  `,
];
const workerDepString = [
  Point.toString(),
  Vector.toString(),
  Spring.toString(),
  Node.toString(),
  Edge.toString(),
  getDegree.toString(),
  ForceLayout.toString(),
];

export interface ForceLayoutOptions extends ForceProps, LayoutOptionBase {
  /** 前置布局 */
  preset?: {
    name: string;
    options: LayoutOption;
  };

  isOptimization?: boolean;
}
interface Return {
  data: Data;
  simulation: ForceSimulation;
}

let globalWorker: undefined | Worker;
const forceLayout = (data: Data, options: ForceLayoutOptions): Return => {
  const { isOptimization, graph, ...others } = options;
  if (globalWorker) {
    globalWorker.terminate();
  }

  /** serialize an object with method */
  const optionString = JSON.stringify(
    others,
    (_key: string, value: any) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    },
    2,
  );

  const workerStringArray = [
    ...babelDepString,
    ...workerDepString,
    `const forceOptions = ${optionString};`,
    workerFunction.toString(),
    `;workerFunction()`,
  ];

  /** Build a worker from an anonymous function body **/

  var blobURL = URL.createObjectURL(
    new Blob(['(()=>{', ...(workerStringArray as [string]), '})()'], {
      type: 'application/javascript',
    }),
  );
  globalWorker = new Worker(blobURL);

  globalWorker.postMessage({
    nodes: data.nodes,
    edges: data.edges,
  });

  let renderIndex = -1;
  const allData: any[] = [];
  let requestAnimationFrameId: number;
  globalWorker.onmessage = e => {
    const { forceData, done } = e.data;
    renderIndex = renderIndex + 1;
    allData.push(forceData);

    if (requestAnimationFrameId) {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }
    if (done) {
      return;
    }

    if (renderIndex === 0) {
      // 从第二个渲染开始做补间动画
      console.info('力导准备阶段...');
      return;
    } else {
      const preData = allData[renderIndex - 1];
      const currData = allData[renderIndex];
      const nodeMap = new Map();
      currData.nodes.forEach((node: any, index: number) => {
        const preNode = preData.nodes[index];
        nodeMap.set(node.id, {
          x: node.x,
          y: node.y,
          // 计算出每个节点的 deltaX 与 deltaY
          deltaX: (node.x - preNode.x) / 60,
          deltaY: (node.y - preNode.y) / 60,
        });
      });

      let stepIndex: number = 0;
      /** 补间动画 */
      const step = () => {
        console.time('cost');
        preData.nodes.forEach((item: NodeType) => {
          const node = graph.findById(item.id);
          const map = nodeMap.get(item.id);
          const model = node.get('model');
          model.x = (item.x as number) + map.deltaX * stepIndex;
          model.y = (item.y as number) + map.deltaY * stepIndex;
        });
        graph.refreshPositions();
        stepIndex++;
        console.timeEnd('cost');
        requestAnimationFrameId = window.requestAnimationFrame(step);
      };
      requestAnimationFrameId = window.requestAnimationFrame(step);
      return;
    }
  };

  return {
    data: data,
    //@ts-ignore
    simulation: null,
  };
};
export default forceLayout;
