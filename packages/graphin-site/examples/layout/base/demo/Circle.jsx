/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(10)
  .circle()
  .graphin();

const App = () => {
  return <Graphin data={data} layout={{ name: 'circle' }} />;
};

ReactDOM.render(<App />, document.getElementById('container'));
