import getNodeProperties from './getNodeProperties';
/**
 *
 * @param nodeIds 节点的ID数组
 * @param nodeType 节点的类型，例如:"UID""PHONE"等
 */
const getNodesById = (nodeIds: string[], nodeType = 'UID') => {
  const nodes = nodeIds.map(id => {
    return {
      id: `node-${id}`,
      label: `node-${id}`,
      type: nodeType,
      properties: [],
    };
  });
  return getNodeProperties(nodes);
};

export default getNodesById;
