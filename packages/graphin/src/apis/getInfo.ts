import { Graph, Node, Edge } from '@antv/g6';

const getInfo = (graph: Graph) => () => {
  const nodes = graph.get('nodes') as Node[];
  const edges = graph.get('edges') as Edge[];
  return {
    count: {
      nodes: nodes.length,
      edges: edges.length,
    },
  };
};
export default getInfo;
