/* eslint-disable no-undef */
import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

import Graphin, { Utils, GraphinContext } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const CustomComponent = (props) => {
  const graphin = React.useContext(GraphinContext);
  console.log('CustomComponent props', props, graphin);
  return <div>hello graphin</div>;
};
const App = () => {
  const graphRef = React.createRef();
  const [state, setState] = React.useState({
    data: Utils.mock(10).circle().graphin(),
  });

  const { data } = state;

  return (
    <div className="App">
      <Graphin
        data={data}
        layout={{
          name: 'grid',
        }}
        ref={graphRef}
      >
        <CustomComponent />
      </Graphin>
    </div>
  );
};

export default App;
