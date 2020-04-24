import { updateChain } from 'immutability-helper-x';
import { NodeData, GrapheneState } from '../../types';

const deleteNodes = (state: GrapheneState, selectedNodes: NodeData[]) => {
  const {
    data: { nodes, edges },
  } = state;

  const selectedNodeIds = selectedNodes.map((node: NodeData) => node.id);
  const newNodes = nodes.filter(node => !selectedNodeIds.includes(node.id));
  const newEdges = edges.filter(
    edge => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target),
  );

  return updateChain(state)
    .$set('drawer', { visible: false, type: '' })
    .$set('selectedNodes', [])
    .$set('data', { nodes: newNodes, edges: newEdges })
    .value();
};

export default deleteNodes;
