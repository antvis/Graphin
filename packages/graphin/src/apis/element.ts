import { Graph } from '@antv/g6';

/**
 * 高亮节点
 * @param graph
 */
export const highlightNodeById = (graph: Graph) => (nodeIds: string[]) => {
  graph.getNodes().forEach(node => {
    graph.clearItemStates(node, ['active', 'inactive']);
    if (nodeIds.indexOf(node.get('id')) !== -1) {
      graph.setItemState(node, 'active', true);
    } else {
      graph.setItemState(node, 'active', false);
    }
  });
};

/**
 * Focus 节点
 * @param graph
 */
export const focusNodeById = (graph: Graph) => (nodeId: string) => {
  if (!graph || typeof nodeId !== 'string') {
    return;
  }

  const node = graph.findById(nodeId);

  if (!node) {
    console.warn(`The node ${nodeId} does not exist!`);
    return;
  }

  graph.focusItem(nodeId, true, {
    duration: 300,
    easing: 'easeCubic',
  });

  graph.setItemState(node, 'selected', true);
  node.toFront();
};
