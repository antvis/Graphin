/* eslint-disable max-classes-per-file */
import { Node as NodeType, Edge as EdgeType } from '../../types';

export class Node {
  id: string;

  data: NodeType;

  x: number;

  y: number;

  constructor(data: NodeType) {
    this.id = data.id;
    this.data = data || {};
    this.x = data.x || 0;
    this.y = data.y || 0;
  }
}

export class Edge {
  id: string;

  source: NodeType;

  target: NodeType;

  data: EdgeType;

  constructor(id: string, source: NodeType, target: NodeType, data: EdgeType) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.data = data || {};
  }
}
