/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
// 引入Graphin CSS

const data = Utils.mock(20).random(0.3).graphin();

const App = () => <Graphin data={data} layout={{ name: 'grid' }} />;

ReactDOM.render(<App />, document.getElementById('container'));
