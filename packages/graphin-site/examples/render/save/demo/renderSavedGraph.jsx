/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(20)
    .random()
    .graphin();

data.nodes.forEach(node => {
    node.x = Math.random() * 500;
    node.y = Math.random() * 500;
});

const App = () => {
    return (
        <div>
            <Graphin data={data} />
        </div>
    );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
