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
        fetch('data/honglou.json')
            .then(res => {
                return res.json();
            })
            .then(res => {
                const { nodes: sourceNodes, edges: sourceEdges } = res.data;
                const nodes = sourceNodes.map(node => {
                    return {
                        id: String(node.id),
                        shape: 'CircleNode',
                        data: node,
                    };
                });
                const edges = sourceEdges.map(edge => {
                    return {
                        source: String(edge.from),
                        target: String(edge.to),
                        data: edge,
                        label: edge.label,
                    };
                });
                setData({
                    nodes,
                    edges,
                });
            });
    }, []);

    console.log(data.edges.length);

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
                        repulsion: data.edges.length * 5,
                        defSpringLen: data.edges.length,
                    },
                }}
            />
        )
    );
};

ReactDOM.render(<App />, document.getElementById('container'));
