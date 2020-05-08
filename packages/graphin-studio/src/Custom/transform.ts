import Storage from '../Service/Storage';
import { bizTypes, BizType } from './config';
import { NodeData, EdgeData } from '../types';

const storage = new Storage('graphin-studio');

if (!storage.get('bizTypes')) {
  storage.set('bizTypes', bizTypes);
}

const transform = {
  nodes: (nodes: NodeData[]) => {
    return nodes.map(node => {
      const BizTypes = storage.get('bizTypes') as BizType[];
      const bizType = BizTypes.find(item => {
        return item.type === node.type;
      }) || { style: {} };

      const { type } = node;

      return {
        id: node.id,
        shape: type === 'phone' ? 'RectNode' : 'CircleNode',
        data: node,
        style: bizType.style,
      };
    });
  },
  edges: (edges: EdgeData[]) => {
    return edges.map(edge => {
      const BizTypes = storage.get('bizTypes') as BizType[];
      const bizType = BizTypes.find(item => {
        return item.type === edge.type;
      }) || { style: {} };

      const { source, target } = edge;
      return {
        source,
        target,
        data: edge,
        style: bizType.style,
      };
    });
  },
  data: (data: { nodes: NodeData[]; edges: EdgeData[] }) => {
    return {
      nodes: transform.nodes(data.nodes),
      edges: transform.edges(data.edges),
    };
  },
};
export default transform;
