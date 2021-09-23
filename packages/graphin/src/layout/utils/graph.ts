/* eslint-disable import/prefer-default-export */
import { Edge } from '../../layout/force/Elements';
import { IUserNode as Node } from '../../typings/type';

const getDegree = (node: Node, edges: Edge[]) => {
  const nodeId = node.data.id;
  let degree = 0;
  let sDegree = 0;
  let tDegree = 0;

  edges.forEach(edge => {
    if (edge.source.id === nodeId) {
      sDegree += 1;
      degree += 1;
    }
    if (edge.target.id === nodeId) {
      tDegree += 1;
      degree += 1;
    }
  });

  return {
    degree,
    sDegree,
    tDegree,
  };
};

// 获取关联节点的类型信息
const getRelativeNodesType = (nodes: Node[], nodeClusterBy: string) => {
  return [...new Set(nodes?.map(node => node?.data?.[nodeClusterBy]))] || [];
};

// 找出指定节点关联的边的起点或终点
const getCoreNode = (type: 'source' | 'target', node: Node, edges: Edge[]) => {
  if (type === 'source') {
    return edges?.find(edge => edge.target?.id === node.id)?.source as Node;
  }
  return edges?.find(edge => edge.source?.id === node.id)?.target as Node;
};

// 找出同类型的节点
const getSameTypeNodes = (type: 'leaf' | 'all', nodeClusterBy: string, node: Node, relativeNodes: Node[]) => {
  const typeName = node?.data?.[nodeClusterBy] || '';
  let sameTypeNodes = relativeNodes?.filter(item => item?.data?.[nodeClusterBy] === typeName) || [];
  if (type === 'leaf') {
    sameTypeNodes = sameTypeNodes.filter(node => node.data?.layout?.degree === 1);
  }
  return sameTypeNodes;
};

// 找出与指定节点关联的边的起点或终点出发的所有一度节点
const getCoreNodeAndRelativeNodes = (type: 'leaf' | 'all', node: Node, edges: Edge[], nodeClusterBy: string) => {
  const { sDegree, tDegree } = node?.data?.layout || {};
  let coreNode: Node = node;
  let relativeNodes: Node[] = [];
  if (tDegree === 1) {
    // 如果为只有1条入边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('source', node, edges);
    relativeNodes = edges?.filter(edge => edge.source?.id === coreNode.id).map(edge => edge.target);
  } else if (sDegree === 1) {
    // 如果为只有1条出边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('target', node, edges);
    relativeNodes = edges?.filter(edge => edge.target?.id === coreNode.id).map(edge => edge.source);
  }
  const sameTypeNodes = getSameTypeNodes(type, nodeClusterBy, node, relativeNodes);
  return { coreNode, relativeNodes, sameTypeNodes };
};

export default {
  getDegree,
  getRelativeNodesType,
  getCoreNodeAndRelativeNodes,
  getCoreNode,
  getSameTypeNodes,
};
