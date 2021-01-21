/* eslint-disable no-undef */
import React from 'react';

import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { message } from 'antd';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const CustomComponent = () => {
  const graphin = React.useContext(GraphinContext);
  console.log('CustomComponent', graphin);
  return <div>hello</div>;
};
const App = () => {
  const [state, setState] = React.useState({
    selected: [],
    data: Utils.mock(5)
      .circle()
      .graphin(),
  });
  const onExpand = () => {
    if (selected.length === 0) {
      message.info('请先选中/圈选节点');
      return;
    }
    const count = 4; // Math.round(Math.random() * 200);

    const expandData = Utils.mock(count)
      .expand(selected)
      .type('company')
      .graphin();

    setState({
      ...state,
      data: {
        // 还需要对Node和Edge去重，这里暂不考虑
        nodes: [...state.data.nodes, ...expandData.nodes],
        edges: [...state.data.edges, ...expandData.edges],
      },
    });
  };

  const { data, selected } = state;
  const graphRef = React.createRef();
  React.useEffect(() => {
    const { graph } = graphRef.current as any;

    // 按住Shift框选,按住Option键 多选，进行关系扩散
    const onNodeSelectChange = e => {
      console.log('nodeselectchange', e);
      const nodes = e.selectedItems.nodes.map(node => {
        return node.get('model');
      });
      setState({
        ...state,
        selected: nodes,
      });
    };

    const handleKeyDown = e => {
      console.log('aaa', e.key);
      if (e.key === 'Enter') {
        onExpand();
      }
    };
    graph.on('keydown', handleKeyDown);

    graph.on('nodeselectchange', onNodeSelectChange);
    return () => {
      graph.off('nodeselectchange', onNodeSelectChange);
      graph.off('keydown', handleKeyDown);
    };
  }, [state]);

  return (
    <div className="App">
      <h3>
        基于力导的节点扩散，支持按住Shift圈选，多个节点同时扩散
        <button onClick={onExpand} style={{ float: 'right', height: '28px', lineHeight: '28px' }}>
          点击扩散
        </button>
      </h3>
      <Graphin
        theme={{ mode: 'dark' }}
        data={data}
        layout={{
          type: 'graphin-force',
          preset: {
            type: 'concentric',
          },
          animation: false,
          defSpringLen: (_edge, source, target) => {
            /** 默认返回的是 200 的弹簧长度 */
            /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */

            const nodeSize = 30;
            const Sdegree = source.data.layout.degree;
            const Tdegree = target.data.layout.degree;
            const minDegree = Math.min(Sdegree, Tdegree);
            console.log(minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize);
            return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize;
          },
        }}
        ref={graphRef}
      >
        <CustomComponent />
        {/* <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} /> */}
      </Graphin>
    </div>
  );
};

export default App;
