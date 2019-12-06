/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

const App = () => {
    const [data, setData] = React.useState({
        nodes: [],
        edges: [],
    });
    const addNode = id => {
        const newNodes = [
            {
                id,
                data: {
                    label: `node-${id}`,
                },
                shape: 'CircleNode',
                label: `node-${id}`, // 应该支持label的选项
            },
        ];
        setData({
            nodes: [...data.nodes, ...newNodes],
            edges: [],
        });
    };
    return (
        <div>
            <Search placeholder="输入节点ID" enterButton="添加节点" size="large" onSearch={addNode} />
            <Graphin data={data} layout={{ name: 'grid' }} />
        </div>
    );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
