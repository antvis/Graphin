import { PlusCircleOutlined } from '@ant-design/icons';
import Graphin, { Utils } from '@antv/graphin';
import { CreateEdge, Toolbar } from '@antv/graphin-components';
import React from 'react';

const App = () => {
  const [state, setState] = React.useState({
    active: false,
    data: Utils.mock(10).random().graphin(),
  });
  /**
   * 回掉函数
   * edges 当前画布的边集合，包含新创建的边
   * edge 新创建的边
   */
  const handleChange = (edges, edge) => {
    // 如果需要多边的话
    const pEdges = Utils.processEdges(edges, { poly: 50, loop: 10 });

    setState({
      ...state,
      data: {
        nodes: state.data.nodes,
        edges: pEdges,
      },
    });
  };
  const handleClick = () => {
    setState({
      ...state,
      active: !state.active,
    });
  };
  const { active, data } = state;

  return (
    <div className="App">
      <Graphin data={data} layout={{ type: 'graphin-force', animation: false }}>
        {/** 可以将此功能集成在Toolbar中 * */}
        <Toolbar>
          <Toolbar.Item onClick={handleClick}>
            <CreateEdge onChange={handleChange} active={active} onClick={handleClick}>
              <PlusCircleOutlined /> {active ? '取消连线' : '建立关联'}
            </CreateEdge>
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

export default App;
