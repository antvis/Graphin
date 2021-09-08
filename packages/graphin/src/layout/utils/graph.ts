/* eslint-disable import/prefer-default-export */
import { Edge } from '../../layout/force/Elements';
import { IUserNode as Node } from '../../typings/type';

export const getDegree = (node: Node, edges: Edge[]) => {
  const nodeId = node.data.id;
  let degree = 0;
  let sDegree = 0;
  let tDegree = 0;

  edges.forEach(edge => {
    if (edge.source.id === nodeId) {
      sDegree += 1;
      degree += 1;
    }
    if (edge.target.id === nodeId) {
      tDegree += 1;
      degree += 1;
    }
  });

  return {
    degree,
    sDegree,
    tDegree,
  };
};
