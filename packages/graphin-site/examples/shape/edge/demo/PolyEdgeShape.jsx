/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(5).circle().graphin();
// 5边 MOCK
const polyEdge1 = (c) => {
  const item = { source: 'node-0', target: 'node-1', label: `edge-0_1_${c}` };
  return {
    ...item,
    data: {
      ...item,
      properties: [],
    },
  };
};
for (let i = 0; i < 3; i++) data.edges.push(polyEdge1(i));
// 4边 MOCK
const polyEdge2 = (c) => {
  const item = { source: 'node-0', target: 'node-2', label: `edge-0_2_${c}` };
  return {
    ...item,
    data: {
      ...item,
      properties: [],
    },
  };
};
for (let i = 0; i < 2; i++) data.edges.push(polyEdge2(i));

const App = () => {
  return (
    <div className="App">
      <Graphin
        data={data}
        options={{
          autoPolyEdge: true,
        }}
        layout={{
          name: 'force',
          options: {
            defSpringLen: (_edge, source, target) => {
              /** 默认返回的是 200 的弹簧长度 */

              /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */
              const nodeSize = 30;
              const Sdegree = source.data.layout?.degree;
              const Tdegree = target.data.layout?.degree;
              const minDegree = Math.min(Sdegree, Tdegree);
              return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
            },
          },
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
