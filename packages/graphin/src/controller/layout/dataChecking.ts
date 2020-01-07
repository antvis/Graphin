import { Data } from '../../types';

// Checking data, filter out invalid data and fill in optional field with default value
const dataChecking = (data: Data = { nodes: [], edges: [] }): Data => {
  const { edges = [], nodes = [] } = data;
  // nodes
  const nodeIds: string[] = [];
  const graphinNodes = nodes
    .filter(node => {
      const { id } = node;
      // 如果节点不存在，则忽略该节点
      if (!id) {
        console.warn(`node requires an id，this '${JSON.stringify(node)}' node will be automatically filtered`);
        return false;
      }
      if (!node.data) {
        console.warn(`node requires an data field，this '${JSON.stringify(node)}' node will be automatically filtered`);
        return false;
      }
      // 如果节点ID存在重复，则忽略后加入的节点
      if (nodeIds.indexOf(id) !== -1) {
        return false;
      }

      nodeIds.push(id);
      return true;
    })
    .map(node => {
      return {
        shape: node.shape || 'CircleNode',
        ...node,
        data: {
          ...node.data,
          id: node.id,
        },
      };
    });

  // edges
  const graphinEdges = edges
    .filter(edge => {
      const { source, target } = edge;
      if (!source || !target) {
        // eslint-disable-next-line no-console
        console.log(
          `edge requires  source and target，this '${JSON.stringify(edge)}' edge will be automatically filtered`,
        );
        return false;
      }
      if (!edge.data) {
        // eslint-disable-next-line no-console
        console.log(`edge requires an data field，this '${JSON.stringify(edge)}' edge will be automatically filtered`);
        return false;
      }
      /** 边是可以重复的，因为properties可能不一样 */
      return true;
    })
    .map(edge => {
      const { source, target, shape, style } = edge;
      return {
        shape: shape || source === target ? 'loop' : 'LineEdge',
        style: style || {
          endArrow: true,
          stroke: '#ddd',
          cursor: 'pointer',
          lineWidth: 1.5,
          lineAppendWidth: 10, // 添加hover上去的宽度,
        },
        loopCfg: {
          position: 'top',
          dist: 20,
        },
        ...edge,
        data: {
          ...edge.data,
          source: edge.source,
          target: edge.target,
        },
      };
    });

  return {
    nodes: graphinNodes,
    edges: graphinEdges,
  };
};

export default dataChecking;
