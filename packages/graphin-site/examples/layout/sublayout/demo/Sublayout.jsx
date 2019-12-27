/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Layout } from '@antv/graphin';
import { Button } from 'antd';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const getSub = data => {
    const { nodes, edges } = data;

    const subNodes1 = [];
    const subEdges1 = [];
    const subNodes2 = [];
    const subEdges2 = [];

    // split the nodes into two parts
    nodes.forEach((node, i) => {
        if (i < 10) {
            subNodes1.push(node);
        } else {
            subNodes2.push(node);
        }
    });

    // find the edges for these two parts
    edges.forEach(edge => {
        let findSource = false;
        let findTarget = false;
        subNodes1.forEach(sn => {
            if (edge.source === sn.id) {
                findSource = true;
            } else if (edge.target === sn.id) {
                findTarget = true;
            }
        });
        if (findSource && findTarget) {
            subEdges1.push(edge);
            return;
        }
        findSource = false;
        findTarget = false;
        subNodes2.forEach(sn => {
            if (edge.source === sn.id) {
                findSource = true;
            } else if (edge.target === sn.id) {
                findTarget = true;
            }
        });
        if (findSource && findTarget) {
            subEdges2.push(edge);
        }
    });

    // layout the part1
    const node1 = Layout.Circle({ nodes: subNodes1, edges: subEdges1 }, { x: 100, y: 100, r: 80 });

    // layout the part2
    const node2 = Layout.Radial({ nodes: subNodes2, edges: subEdges2 }, { center: [220, 220], unitRadius: 100 });

    // combine the two parts
    const newNodes = [...node1.nodes, ...node2.nodes];

    return {
        data: {
            nodes: newNodes,
            edges: data.edges,
        },
        //  stop the simulation if the previous layout is force layout
        layout: null,
    };
};
const App = () => {
    const testData = {
        nodes: [
            { id: 'node-0' },
            { id: 'node-1' },
            { id: 'node-2' },
            { id: 'node-3' },
            { id: 'node-4' },
            { id: 'node-5' },
            { id: 'node-6' },
            { id: 'node-7' },
            { id: 'node-8' },
            { id: 'node-9' },
            { id: 'node-10' },
            { id: 'node-11' },
            { id: 'node-12' },
            { id: 'node-13' },
            { id: 'node-14' },
            { id: 'node-15' },
            { id: 'node-16' },
            { id: 'node-17' },
            { id: 'node-18' },
            { id: 'node-19' },
        ],
        edges: [
            { source: 'node-10', target: 'node-11' },
            { source: 'node-10', target: 'node-12' },
            { source: 'node-10', target: 'node-13' },
            { source: 'node-10', target: 'node-14' },
            { source: 'node-10', target: 'node-15' },
            { source: 'node-11', target: 'node-12' },
            { source: 'node-11', target: 'node-16' },
            { source: 'node-11', target: 'node-17' },
            { source: 'node-11', target: 'node-18' },
            { source: 'node-18', target: 'node-19' },
        ],
    };
    const nodes = [];
    const edges = [];
    testData.nodes.forEach(tnode => {
        tnode.label = tnode.id;
        tnode.type = 'company';
        tnode.shape = 'CircleNode';
        tnode.style = {};
        const node = {
            id: tnode.id,
            data: tnode,
            shape: 'CircleNode',
            style: {},
        };
        nodes.push(node);
    });
    testData.edges.forEach(tedge => {
        const edge = {
            source: tedge.source,
            target: tedge.target,
            data: tedge,
        };
        edges.push(edge);
    });
    const [state, setState] = React.useState({
        data: { nodes, edges },
        layout: {
            name: 'force',
        },
    });

    const { data, layout } = state;

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    const result = getSub(data);
                    setState({
                        ...result,
                    });
                }}
            >
                sub layout
            </Button>
            <Graphin data={data} layout={layout} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('container'));
