import { G6Event, G6KeyboardEvent, EdgeData, NodeData } from '../types';
import { IGraph } from '@antv/g6/lib/interface/graph';
import { INode, IEdge } from '@antv/g6/lib/interface/item';
// import { Node, Edge } from '@antv/g6';

export default {
  getDefaultCfg() {
    return {
      multiple: true,
      keyCode: 18,
    };
  },
  getEvents() {
    return {
      'node:click': 'onClick',
      'edge:click': 'onEdgeClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
      'canvas:click': 'onCanvasClick',
    };
  },
  clearStates() {
    // eslint-disable-next-line
    const { graph } = this as any;
    graph.getNodes().forEach((node: NodeData) => {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach((edge: EdgeData) => {
      graph.clearItemStates(edge);
    });
  },
  onCanvasClick() {
    this.clearStates();
  },
  // TODO NEED TO redefine "this" type
  onEdgeClick(e: G6Event) {
    // eslint-disable-next-line
    const { graph }: { graph: IGraph } = this as any;
    const currentEdge = e.item;
    const sourceNode = currentEdge.get('source');
    const targetNode = currentEdge.get('target');
    this.clearStates();
    currentEdge.toFront();
    graph.getNodes().forEach((node: INode) => {
      const id = node.get('id');
      if (id === sourceNode.get('id') || id === targetNode.get('id')) {
        graph.setItemState(sourceNode, 'highlight.source', true);
        graph.setItemState(targetNode, 'highlight.target', true);
        graph.setItemState(node, 'highlight.dark', false);
        graph.setItemState(node, 'highlight.light', true);
        graph.setItemState(currentEdge, 'selected', true);
      } else {
        graph.setItemState(node, 'highlight.light', false);
        graph.setItemState(node, 'highlight.dark', true);
      }
    });
  },
  // TODO NEED TO redefine "this" type
  process(node: INode) {
    // eslint-disable-next-line
    const { graph }: { graph: IGraph } = this as any;
    /** process Edges */
    const allEdges = graph.getEdges();

    const relativeEdges = node.getEdges();
    const relativeEdgesIds = relativeEdges.map((edge: IEdge) => edge.get('id'));
    const unRelativeEdges: IEdge[] = [];

    const relativeNodeSet = new Set([node]);

    allEdges.forEach((edge: IEdge) => {
      const id = edge.get('id');
      const source = edge.get('source');
      const target = edge.get('target');
      if (relativeEdgesIds.indexOf(id) !== -1) {
        relativeNodeSet.add(source);
        relativeNodeSet.add(target);
      } else {
        unRelativeEdges.push(edge);
      }
    });

    /** process Nodes */
    const allNodes = graph.getNodes();
    const relativeNodes = [...relativeNodeSet];
    const relativeNodesIds = relativeNodes.map(item => item.get('id'));

    const unRelativeNodes = allNodes.filter((item: INode) => {
      return relativeNodesIds.indexOf(item.get('id')) === -1;
    });
    return {
      relativeEdges,
      unRelativeEdges,
      relativeNodes,
      unRelativeNodes,
    };
  },
  // TODO NEED TO redefine "this" type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick(e: G6Event) {
    const { keydown, graph }: { keydown: string; graph: IGraph } = this as any; // eslint-disable-line
    const currentNode = e.item;
    const { relativeEdges, unRelativeEdges, relativeNodes, unRelativeNodes } = this.process(currentNode as INode);
    // 单选
    if (!keydown) {
      this.clearStates();

      relativeNodes.forEach((node: INode) => {
        if (currentNode.get('id') === node.get('id')) {
          graph.setItemState(currentNode, 'selected', true);
        } else {
          graph.setItemState(node, 'highlight.dark', false);
          graph.setItemState(node, 'highlight.light', true);
        }
      });
      unRelativeNodes.forEach((node: INode) => {
        graph.setItemState(node, 'highlight.light', false);
        graph.setItemState(node, 'highlight.dark', true);
      });
      relativeEdges.forEach((edge: IEdge) => {
        edge.toFront();
        graph.setItemState(edge, 'highlight.dark', false);
        graph.setItemState(edge, 'highlight.light', true);
      });
      unRelativeEdges.forEach((edge: IEdge) => {
        edge.toBack();
        graph.setItemState(edge, 'highlight.light', false);
        graph.setItemState(edge, 'highlight.dark', true);
      });
    } else {
      //  按住ctrl 多选
      relativeEdges.forEach((edge: IEdge) => {
        graph.setItemState(edge, 'highlight.dark', false);
        graph.setItemState(edge, 'highlight.light', true);
      });
      graph.setItemState(currentNode, 'highlight.dark', false);
      graph.setItemState(currentNode, 'highlight.light', true);
    }
  },

  onKeyDown(e: G6KeyboardEvent) {
    const ctx = this as any; // eslint-disable-line
    const { keyCode } = this as any; // eslint-disable-line

    const code = e.keyCode || e.which;
    if (code === keyCode) {
      ctx.keydown = true;
    } else {
      ctx.keydown = false;
    }
  },
  onKeyUp() {
    const ctx = this as any; // eslint-disable-line
    ctx.keydown = false;
  },
};
