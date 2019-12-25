/* eslint-disable no-console */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const App = () => {
    const [data, setData] = React.useState({
        nodes: [],
        edges: [],
    });

    React.useEffect(() => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
            .then(res => {
                return res.json();
            })
            .then(res => {
                const { nodes: sourceNodes, edges: sourceEdges } = res;
                const nodes = sourceNodes.map(node => {
                    return {
                        id: node.id,
                        shape: 'CircleNode',
                        // label: node.name,
                        data: node,
                    };
                });
                const edges = sourceEdges.map(edge => {
                    return {
                        source: edge.source,
                        target: edge.target,
                        data: edge,
                        // label: edge.properties.role,
                    };
                });
                setData({
                    nodes,
                    edges,
                });
            });
    }, []);

    console.log(data);

    return (
        data.nodes.length > 0 && (
            <Graphin
                data={data}
                layout={{
                    name: 'force',
                    options: {
                        preset: {
                            name: 'concentric',
                        },
                        repulsion: data.edges.length * 15,
                        defSpringLen: 200,
                        maxSpeed: 1000,
                        MaxIterations: 240,
                    },
                }}
            />
        )
    );
};

ReactDOM.render(<App />, document.getElementById('container'));
