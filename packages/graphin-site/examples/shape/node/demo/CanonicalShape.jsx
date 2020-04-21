/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

/**
 * Graphin 内置几种预定义的节点样式，您可以根据需要选择合适的样式
 */
const INNER_SHAPES = [
  'CanonicalStubNode',
  'CanonicalCircleNode',
  'CanonicalHexagonNode',
  'CanonicalPointNode',
  'CanonicalRectNode',
];

const data = Utils.mock(20).random().graphin();
data.nodes = data.nodes.map((node) => {
  node.shape = INNER_SHAPES[Math.floor(Math.random() * INNER_SHAPES.length)];
  node.style = node.style || {};
  // 修改节点大小
  node.style.nodeSize = 36;
  // 设置节点徽标
  node.badge = 4;
  return node;
});
data.edges = data.edges.map((edge, index) => {
  edge.shape = 'CanonicalLineEdge';
  edge.style = edge.style || {
    line: {},
  };
  // 设置Edge虚实
  edge.style.line.dash = index % 3 === 0 ? [2, 2] : null;
  // 设置Edge的宽度
  edge.style.line.width = index % 3 === 1 ? 3 : 1;
  return edge;
});

const App = () => {
  return (
    <div>
      <Graphin data={data} />
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
