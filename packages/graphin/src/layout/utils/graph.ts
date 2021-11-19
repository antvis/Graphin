/* eslint-disable import/prefer-default-export */
import { Edge } from '../../layout/force/Elements';
import { IUserNode as Node } from '../../typings/type';
import Utils from '../../utils/index';

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
export const getRelativeNodesType = (nodes: Node[], nodeClusterBy: string) => {
  return [...new Set(nodes?.map(node => node?.data?.[nodeClusterBy]))] || [];
};

// 找出指定节点关联的边的起点或终点
const getCoreNode = (type: 'source' | 'target', node: Node, edges: Edge[]) => {
  if (type === 'source') {
    return (edges?.find(edge => edge.target?.id === node.id)?.source || {}) as Node;
  }
  return (edges?.find(edge => edge.source?.id === node.id)?.target || {}) as Node;
};

// 找出同类型的节点
const getSameTypeNodes = (type: 'leaf' | 'all', nodeClusterBy: string, node: Node, relativeNodes: Node[]) => {
  const typeName = node?.data?.[nodeClusterBy] || '';
  let sameTypeNodes = relativeNodes?.filter(item => item?.data?.[nodeClusterBy] === typeName) || [];
  if (type === 'leaf') {
    sameTypeNodes = sameTypeNodes.filter(node => node.data?.layout?.sDegree === 0 || node.data?.layout?.tDegree === 0);
  }
  return sameTypeNodes;
};

// 找出指定节点为起点或终点的所有一度叶子节点
const getRelativeNodes = (type: 'source' | 'target' | 'both', coreNode: Node, edges: Edge[]) => {
  let relativeNodes: Node[] = [];
  switch (type) {
    case 'source':
      relativeNodes = edges?.filter(edge => edge.source?.id === coreNode.id).map(edge => edge.target);
      break;
    case 'target':
      relativeNodes = edges?.filter(edge => edge.target?.id === coreNode.id).map(edge => edge.source);
      break;
    case 'both':
      relativeNodes = edges
        ?.filter(edge => edge.source?.id === coreNode.id)
        .map(edge => edge.target)
        .concat(edges?.filter(edge => edge.target?.id === coreNode.id).map(edge => edge.source));
      break;
    default:
      break;
  }
  // 去重
  relativeNodes = Utils.uniqBy(relativeNodes, (a: Node, b: Node) => {
    return a.id === b.id;
  });
  return relativeNodes;
};

// 找出与指定节点关联的边的起点或终点出发的所有一度叶子节点
const getCoreNodeAndRelativeLeafNodes = (type: 'leaf' | 'all', node: Node, edges: Edge[], nodeClusterBy: string) => {
  const { sDegree, tDegree } = node?.data?.layout || {};
  let coreNode: Node = node;
  let relativeLeafNodes: Node[] = [];
  if (sDegree === 0) {
    // 如果为没有出边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('source', node, edges);
    relativeLeafNodes = getRelativeNodes('both', coreNode, edges);
  } else if (tDegree === 0) {
    // 如果为没有入边边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('target', node, edges);
    relativeLeafNodes = getRelativeNodes('both', coreNode, edges);
  }
  relativeLeafNodes = relativeLeafNodes.filter(
    node => node.data?.layout.sDegree === 0 || node.data?.layout.tDegree === 0,
  );
  const sameTypeLeafNodes = getSameTypeNodes(type, nodeClusterBy, node, relativeLeafNodes);
  return { coreNode, relativeLeafNodes, sameTypeLeafNodes };
};

export const getMinDistanceNode = (sameTypeLeafNodes: Node[]) => {
  const xInfo: number[] = sameTypeLeafNodes.map(item => item.x as number);
  const yInfo: number[] = sameTypeLeafNodes.map(item => item.y as number);
  const avgX = (Math.max.apply(null, xInfo) + Math.min.apply(null, xInfo)) / 2;
  const avgY = (Math.max.apply(null, yInfo) + Math.min.apply(null, yInfo)) / 2;
  // 计算节点和同类型节点平均位置节点的距离
  const getDistance = (x: number, y: number) => {
    return Math.sqrt((x - avgX) * (x - avgX) + (y - avgY) * (y - avgY));
  };
  const distanceInfo = sameTypeLeafNodes.map(item => getDistance(item.x || 0, item.y || 0));
  // 找出同类型节点平均位置节点的距离最近的节点
  return sameTypeLeafNodes[distanceInfo.findIndex(item => item === Math.min.apply(null, distanceInfo))];
};

export default {
  getDegree,
  getRelativeNodesType,
  getCoreNodeAndRelativeLeafNodes,
  getCoreNode,
  getSameTypeNodes,
  getMinDistanceNode,
};
