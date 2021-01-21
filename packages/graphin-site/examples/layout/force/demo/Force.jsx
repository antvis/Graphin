/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(20)
  .tree()
  .graphin();

const App = () => <Graphin data={data} layout={{ name: 'force', options: { preset: 'concentric' } }} />;

ReactDOM.render(<App />, document.getElementById('container'));
