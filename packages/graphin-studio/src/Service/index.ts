import { Utils } from '@antv/graphin';
import getNodesById from './getNodesById';
import getNodeProperties from './getNodeProperties';
import transform from '../Custom/transform';
/**
 *
 * @param nodeIds 节点id数组
 * @param nodeType 节点类型
 */
// eslint-disable-next-line
const queryNodes = (nodeIds: any[], nodeType: string) => {
    const nodes = transform.nodes(getNodesById(nodeIds, nodeType));

    return new Promise(resolve => resolve(nodes));
};

/**
 *
 * @param count 节点的个数
 * @param mockType Mock的类型 random | circle
 * @param options Mock的配置参数 random:0.5 | circle:node-0
 */
// eslint-disable-next-line
const queryGraph = (count: number, mockType: string, options: any) => {
    // const data = Utils.mock(count)
    //     .type('company')
    //     [mockType](options)
    //     .value();
    const data = {
        nodes: [
            // ...oneNodes,
            {
            id: 'node6',
            groupId: 'group3',
            label: 'node6-group3',
            x: 100,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node6-1',
            groupId: 'group3',
            label: 'node6-group3-1',
            x: 110,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node6-2',
            groupId: 'group3',
            label: 'node6-group3-2',
            x: 120,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node6-3',
            groupId: 'group3',
            label: 'node6-group3-3',
            x: 140,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node6-4',
            groupId: 'group3',
            label: 'node6-group3-4',
            x: 150,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node6-5',
            groupId: 'group3',
            label: 'node6-group3-5',
            x: 160,
            y: 300,
            shape: 'rect'
            },
            {
            id: 'node1',
            label: 'node1-group1',
            groupId: 'group1',
            x: 100,
            y: 100
            },
            {
            id: 'node9',
            label: 'node9-p1',
            groupId: 'p1',
            x: 300,
            y: 210
            },
            {
            id: 'node2',
            label: 'node2-group2',
            groupId: 'group1',
            x: 150,
            y: 200
            },
            {
            id: 'node3',
            label: 'node3-group2',
            groupId: 'group2',
            x: 300,
            y: 100
            },
            {
            id: 'node7',
            groupId: 'p1',
            label: 'node7-p1',
            x: 200,
            y: 200
            },
            {
            id: 'node10',
            label: 'node10-p2',
            groupId: 'p2',
            x: 300,
            y: 210
            }
        ],
        edges: [
            {
            source: 'node1',
            target: 'node2'
            },
            {
            source: 'node2',
            target: 'node3'
            },
            {
            source: 'node1',
            target: 'node3'
            },
            {
            source: 'node6',
            target: 'node1'
            }
        ],
        groups: [
            {
            id: 'group1',
            title: {
                text: '我的群组1',
                stroke: '#444',
                offsetX: -20,
                offsetY: 30
            },
            parentId: 'p1'
            },
            {
            id: 'group2',
            title: '2',
            parentId: 'p1'
            },
            {
            id: 'group3',
            title: {
                text: '群组2',
                stroke: '#444',
                offsetX: -20,
                offsetY: 30
            },
            parentId: 'p2'
            },
            {
            id: 'p1',
            title: '3'
            },
            {
            id: 'p2',
            title: '3'
            }
        ]
    };
    const nodes = getNodeProperties(data.nodes);
    const graphinNodes = transform.nodes(nodes);
    const graphinEdges = transform.edges(data.edges);


    return new Promise(resolve =>
        resolve({
            nodes: graphinNodes,
            edges: graphinEdges,
            groups: data.groups
        })
    );
};

export default { queryNodes, queryGraph };
