/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';

import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { Toolbar, ContextMenu } from '@antv/graphin-components';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

const data = Utils.mock(10)
  .circle()
  .graphin();

const App = () => {
  return (
    <div>
      <Graphin data={data} layout={{ name: 'concentric' }}>
        <Toolbar />
        <ContextMenu
          render={() => {
            return (
              <div style={{ height: 60, width: 150, background: '#fff', border: '1px solid #ddd' }}>
                custom ContextMenu
              </div>
            );
          }}
        />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
