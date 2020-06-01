/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const App = () => {
  const [state, setState] = React.useState({
    data: Utils.mock(5).circle().graphin(),
  });

  const { data, selected } = state;

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
