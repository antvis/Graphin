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

    return new Promise((resolve) => resolve(nodes));
};

/**
 *
 * @param count 节点的个数
 * @param mockType Mock的类型 random | circle
 * @param options Mock的配置参数 random:0.5 | circle:node-0
 */
// eslint-disable-next-line
const queryGraph = (count: number, mockType: string, options: any) => {
    const data = Utils.mock(count).type('company')[mockType](options).value();
    const nodes = getNodeProperties(data.nodes);
    const graphinNodes = transform.nodes(nodes);
    const graphinEdges = transform.edges(data.edges);

    return new Promise((resolve) =>
        resolve({
            nodes: graphinNodes,
            edges: graphinEdges,
        }),
    );
};

export default { queryNodes, queryGraph };
