/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = {
    edges: [],
    nodes: [
        {
            id: 'Shape-CircleNode',
            shape: 'CircleNode',
            data: {
                label: `shape:"CircleNode"`,
            },
        },
    ],
};

const App = () => <Graphin data={data} layout={{ name: 'grid' }} />;

ReactDOM.render(<App />, document.getElementById('container'));
