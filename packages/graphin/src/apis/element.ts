import { Graph } from '@antv/g6';

/**
 * 高亮节点
 * @param graph
 */
export const highlightNodeById = (graph: Graph) => (nodeIds: string[]) => {
  graph.getNodes().forEach(node => {
    graph.clearItemStates(node, ['highlight.light', 'highlight.dark']);
    if (nodeIds.indexOf(node.get('id')) !== -1) {
      graph.setItemState(node, 'highlight.light', false);
    } else {
      graph.setItemState(node, 'highlight.dark', true);
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

  graph.setItemState(node, 'focus', true);
  node.toFront();
};
