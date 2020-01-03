/* eslint-disable import/prefer-default-export */
import { Edge } from '../../layout/force/Elements';
import { Node } from '../../types';

export const getDegree = (node: Node, edges: Edge[]) => {
  const nodeId = node.data.id;
  let index = 0;

  edges.forEach(edge => {
    if (edge.data.source === nodeId || edge.data.target === nodeId) {
      index = index + 1;
    }
  });

  return index;
};
