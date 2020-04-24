/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

/**
 * Graphin 内置几种预定义的节点样式，您可以根据需要选择合适的样式
 */
const INNER_SHAPES = ['StubNode', 'CircleNode', 'HexagonNode', 'PointNode', 'RectNode', 'SimplicityNode'];

const data = Utils.mock(20).tree().graphin();
data.nodes.forEach((node, index) => {
  const shape = INNER_SHAPES[index % INNER_SHAPES.length];
  node.shape = shape;
  node.label = shape;
  node.style = node.style || {};
  // 修改节点大小
  node.style.nodeSize = 26;
  // 设置节点徽标
  node.badge = 4;
});
data.edges.forEach((edge, index) => {
  edge.shape = 'LineEdge';
  edge.style = edge.style || {
    line: {},
  };
  // 设置Edge虚实
  edge.style.line.dash = index % 3 === 0 ? [2, 2] : null;
  // 设置Edge的宽度
  edge.style.line.width = index % 3 === 1 ? 3 : 1;
});

const App = () => {
  return (
    <div>
      <Graphin data={data} layout={{ name: 'force' }} />
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
