/* eslint-disable no-undef */
import React from 'react';

import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { message } from 'antd';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

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
        data={data}
        layout={{
          type: 'gForce',
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
