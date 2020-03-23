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
  globalWorker.onmessage = e => {
    const forceData = e.data;
    try {
      forceData.nodes.forEach((item: NodeType) => {
        const node = graph.findById(item.id);
        if (node) {
          // 因为有可能画布删除了节点
          const model = node.get('model');
          model.x = item.x;
          model.y = item.y;
          if (isOptimization) {
            optimizeDrawingByNode(true, node);
          }
        }
      });
      graph.refreshPositions();
      data = forceData;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {
    data: data,
    //@ts-ignore
    simulation: null,
  };
};
export default forceLayout;
