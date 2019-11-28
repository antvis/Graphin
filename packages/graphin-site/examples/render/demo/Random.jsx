/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Graphin from '@antv/graphin';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const Graphin = window.Graphin.default;
const { Utils } = window.Graphin;

const data = Utils.mock(10)
    .random()
    .graphin();

const App = () => {
    return (
        <div>
            <Graphin data={data} />
        </div>
    );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
