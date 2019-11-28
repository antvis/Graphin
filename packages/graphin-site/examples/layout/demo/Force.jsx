/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Graphin from '@antv/graphin';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const Graphin = window.Graphin.default;
const { Utils } = window.Graphin;
// console.log(ReactDOM, window.ReactDOM);

const data = Utils.mock(100)
    .random(0.3)
    .graphin();

const App = () => {
    return (
        <div>
            <Graphin data={data} layout={{ name: 'force' }} />
        </div>
    );
};
const rootElement = document.getElementById('container');
window.ReactDOM.render(<App />, rootElement);
