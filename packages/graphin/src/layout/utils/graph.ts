/* eslint-disable import/prefer-default-export */
import { Edge } from '../../layout/force/Elements';
import { IUserNode as Node } from '../../typings/type';

export const getDegree = (node: Node, edges: Edge[]) => {
  const nodeId = node.data.id;
  let index = 0;

  edges.forEach(edge => {
    if (edge.source.id === nodeId || edge.target.id === nodeId) {
      index = index + 1;
    }
  });

  return index;
};
