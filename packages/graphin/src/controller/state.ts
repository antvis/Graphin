import { Graph } from '@antv/g6';
import { INode, IEdge } from '@antv/g6/lib/interface/item';
import { Data } from '../types';

const initState = (graph: Graph, data: Data) => {
  if (!graph) return;

  const autoPaint = graph.get('autoPaint');
  graph.setAutoPaint(false);

  const { nodes = [], edges = [] } = data;
  nodes.forEach(node => {
    /**
     * TODO
     * graphin 2.0  将改造这块: node.data.states 将改为 node.status
     * 1.x 版本先暂定这样
     */
    if (node?.data?.states) {
      const { states = {} } = node.data;
      Object.keys(states).forEach(k => {
        graph.setItemState(node.id, k, states[k]);
      });
    }
  });
  edges.forEach(edge => {
    if (edge?.data?.states) {
      const { states = {}, id = '' } = edge.data;
      Object.keys(states).forEach(k => {
        graph.setItemState(id, k, states[k]);
      });
    }
  });

  graph.paint();
  graph.setAutoPaint(autoPaint);
};

export default initState;
