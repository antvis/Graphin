/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { LayoutOutlined } from '@ant-design/icons';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { Toolbar } from '@antv/graphin-components';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

const data = Utils.mock(10).circle().graphin();

const App = () => {
  const renderToolbar = (renderProps, _state) => {
    const { toolbarCfg } = renderProps;
    const items = [
      {
        id: 'custom',
        name: 'custom',
        icon: <LayoutOutlined />,
        disabled: false,
        action: () => {},
        style: {},
        renderTooltip: () => {
          return <div>Custom</div>;
        },
      },
    ];

    return [...items, ...toolbarCfg];
  };

  return (
    <div>
      <Graphin data={data} layout={{ name: 'concentric' }}>
        <Toolbar direction="vertical" render={renderToolbar} />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
