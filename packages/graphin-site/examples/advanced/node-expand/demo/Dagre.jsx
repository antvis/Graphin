/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
// 引入Graphin CSS
// 引入Graphin CSS

const App = () => {
  const [state, setState] = React.useState({
    selected: [],
    data: Utils.mock(5).circle().graphin(),
  });

  const { data, selected } = state;
  const graphRef = React.createRef(null);
  React.useEffect(() => {
    const { graph } = graphRef.current;
    // 按住Shift框选,按住Option键 多选，进行关系扩散
    const onNodeSelectChange = (e) => {
      console.log('nodeselectchange', e);
      const nodes = e.selectedItems.nodes.map((node) => {
        return node.get('model');
      });
      setState({
        ...state,
        selected: nodes,
      });
    };

    graph.on('nodeselectchange', onNodeSelectChange);
    return () => {
      graph.off('nodeselectchange', onNodeSelectChange);
    };
  }, [state]);

  const onExpand = () => {
    if (selected.length === 0) {
      message.info('请先选中/圈选节点');
      return;
    }
    const count = Math.round(Math.random() * 20);

    const expandData = Utils.mock(count).expand(selected).type('company').graphin();

    setState({
      ...state,
      data: {
        // 还需要对Node和Edge去重，这里暂不考虑
        nodes: [...state.data.nodes, ...expandData.nodes],
        edges: [...state.data.edges, ...expandData.edges],
      },
    });
  };

  return (
    <div className="App">
      <h3>
        基于有向分层的节点扩散
        <button onClick={onExpand} style={{ float: 'right', height: '28px', lineHeight: '28px' }}>
          点击扩散
        </button>
      </h3>

      <Graphin
        data={data}
        layout={{
          name: 'dagre',
        }}
        ref={graphRef}
      >
        <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} />
      </Graphin>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
