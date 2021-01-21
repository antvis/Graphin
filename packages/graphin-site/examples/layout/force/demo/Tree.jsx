/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(10)
  .tree()
  .graphin();

const App = () => (
  <Graphin
    data={data}
    layout={{
      name: 'force',
      options: {
        preset: { name: 'concentric' },
        defSpringLen: (_edge, source, target) => {
          const nodeSize = 30;
          const Sdegree = source.data.layout?.degree;
          const Tdegree = target.data.layout?.degree;
          const minDegree = Math.min(Sdegree, Tdegree);
          /** 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短，能够产生聚类效果 */
          return minDegree < 2 ? nodeSize : minDegree * nodeSize * 2;
        },
      },
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('container'));
