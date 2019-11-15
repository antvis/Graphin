import { Node as NodeType, Edge as EdgeType } from '../../types';

export class Node {
    id: string;

    data: NodeType;

    constructor(data: any) {
        this.id = data.id;
        this.data = data || {};
    }
}

export class Edge {
    id: string;

    source: NodeType;

    target: NodeType;

    data: EdgeType;

    constructor(id: any, source: any, target: any, data: any) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.data = data || {};
    }
}
