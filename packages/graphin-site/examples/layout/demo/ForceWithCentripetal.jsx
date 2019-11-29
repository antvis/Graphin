/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(150)
    .random(0.3)
    .graphin();

const App = () => {
    return (
        <div>
            <Graphin
                data={data}
                layout={{
                    name: 'force',
                    options: {
                        centripetalOptions: {
                            single: 100, // 给孤立节点设置原来 （100/2）倍的向心力
                            center: (node, degree) => {
                                // 根据不同的节点与度数设置不同的向心力的中心点
                                return {
                                    x: 100,
                                    y: 100,
                                };
                            },
                        },
                    },
                }}
            />
        </div>
    );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
