import { LayoutOption } from '../../controller/layout/defaultLayouts';
import ForceLayout, { ForceProps } from '../force/ForceLayout';

import { LayoutOptionBase, Data, ForceSimulation } from '../../types';

/** web worker */
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
    // eslint-disable-next-line
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

  /** Build a worker from an anonymous function body */

  const blobURL = URL.createObjectURL(
    new Blob(['(()=>{', ...(workerStringArray as [string]), '})()'], {
      type: 'application/javascript',
    }),
  );
  globalWorker = new Worker(blobURL);

  globalWorker.postMessage({
    nodes: data.nodes,
    edges: data.edges,
  });

  // let renderIndex = -1;
  // replace array to swap to avoid memory leak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swap: { pre?: any; current?: any } = {};
  let requestAnimationFrameId: number;

  globalWorker.onmessage = (e) => {
    const { forceData, done } = e.data;
    // renderIndex = renderIndex + 1;
    // allData.push(forceData);
    // swap.pre = swap.current;
    if (requestAnimationFrameId) window.cancelAnimationFrame(requestAnimationFrameId);
    if (done) {
      // force render
      return;
    }

    if (!swap.pre) {
      // 从第二个渲染开始做补间动画
      swap.pre = forceData;
    } else {
      swap.current = forceData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      swap.current.nodes.forEach((node: any, index: number) => {
        const preNode = swap.pre.nodes[index];
        // 计算出每个节点的 deltaX 与 deltaY
        // 补间动画可能需要重新设计采样频率才能保证顺滑
        // 至少保证60像素的位移，避免补间动画卡顿问题
        let deltaX = (node.x - preNode.x) / 60;
        let deltaY = (node.y - preNode.y) / 60;
        // 同方向至少移动1像素
        // eslint-disable-next-line no-nested-ternary
        deltaX = Math.abs(deltaX) > 1 ? deltaX : deltaX >= 0 ? 1 : -1;
        // eslint-disable-next-line no-nested-ternary
        deltaY = Math.abs(deltaY) > 1 ? deltaY : deltaY >= 0 ? 1 : -1;
        preNode.deltaX = deltaX;
        preNode.deltaY = deltaY;
      });

      let stepIndex = 0;
      /** 补间动画 */
      const step = () => {
        // console.time('cost');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        swap.pre.nodes.forEach((item: any) => {
          const node = graph.findById(item.id);
          const model = node.get('model');
          model.x = item.x;
          model.y = item.y;
          item.x = item.x + item.deltaX;
          item.y = item.y + item.deltaY;
        });
        graph.refreshPositions();
        stepIndex++;
        // console.timeEnd('cost');
        requestAnimationFrameId = window.requestAnimationFrame(step);
      };
      requestAnimationFrameId = window.requestAnimationFrame(step);
    }
  };

  return {
    data,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    simulation: null,
  };
};
export default forceLayout;
