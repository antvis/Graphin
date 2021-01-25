/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(10).random().graphin();

const App = () => {
  return (
    <div>
      <Graphin data={data} layout={{ name: 'force' }} />
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
