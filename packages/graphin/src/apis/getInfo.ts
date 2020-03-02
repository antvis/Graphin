import { Graph } from '@antv/g6';
import { INode, IEdge } from '@antv/g6/lib/interface/item';

const getInfo = (graph: Graph) => () => {
  const nodes = graph.get('nodes') as INode[];
  const edges = graph.get('edges') as IEdge[];
  return {
    count: {
      nodes: nodes.length,
      edges: edges.length,
    },
  };
};
export default getInfo;
