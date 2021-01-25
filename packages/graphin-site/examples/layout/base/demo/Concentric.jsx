/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
// 引入Graphin CSS

const data = Utils.mock(10).circle().graphin();

const App = () => <Graphin data={data} layout={{ name: 'concentric' }} />;

ReactDOM.render(<App />, document.getElementById('container'));
