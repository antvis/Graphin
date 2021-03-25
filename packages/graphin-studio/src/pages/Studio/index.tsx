import ConfigationPanel from '@/components/ConfigationPanel';
import Navbar from '@/components/Navbar';
import TableMode from '@/components/TableMode';
import store from '@/redux/store';
import Graphin, { Utils } from '@antv/graphin';
import React from 'react';
import { Provider } from 'react-redux';
import { configSchema, navbarOptions } from './Constants';
import './index.less';

const data = Utils.mock(20)
  .tree()
  .graphin();
const GraphinStudio = () => {
  const [state, setState] = React.useState({
    activeNavbar: 'statistics',
    collapse: false,
  });

  const handleChangeNavbar = opt => {
    const isSame = state.activeNavbar === opt.id;
    setState({
      ...state,
      activeNavbar: opt.id,
      collapse: isSame ? !state.collapse : false,
    });
  };

  return (
    // const [state, dispatch] = useReducer(reducer, initialState);
    // const { data, layout, toolbar, graphRef } = state as GraphinStudioState;
    <Provider store={store}>
      <div className="studio">
        <div className="studio-nav">
          <Navbar options={navbarOptions} value={state.activeNavbar} onChange={handleChangeNavbar} />
        </div>
        <div className={`studio-conf ${state.collapse ? 'collapse' : ''}`}>
          <ConfigationPanel value={state.activeNavbar} options={configSchema} />
        </div>
        <div className="studio-workspace">
          <div className="studio-canvas">
            <Graphin data={data} layout={{ type: 'dagre' }} theme={{ mode: 'dark' }} />
          </div>
          <div className="studio-footer">
            <TableMode />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default GraphinStudio;
