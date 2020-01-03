import { G6Event, G6KeyboardEvent } from '../types';
import { Node, Edge } from '@antv/g6';

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
    graph.getNodes().forEach((node: Node) => {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach((edge: Edge) => {
      graph.clearItemStates(edge);
    });
  },
  onCanvasClick() {
    this.clearStates();
  },
  onEdgeClick(e: G6Event) {
    // eslint-disable-next-line
    const { graph } = this as any;
    const currentEdge = e.item;
    const sourceNode = currentEdge.get('source');
    const targetNode = currentEdge.get('target');
    this.clearStates();
    currentEdge.toFront();
    graph.getNodes().forEach((node: Node) => {
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
  process(node: Node) {
    // eslint-disable-next-line
    const { graph } = this as any;
    /** process Edges */
    const allEdges = graph.getEdges();

    const relativeEdges = node.getEdges();
    const relativeEdgesIds = relativeEdges.map((edge: Edge) => edge.get('id'));
    const unRelativeEdges: Edge[] = [];

    const relativeNodeSet = new Set([node]);

    allEdges.forEach((edge: Edge) => {
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

    const unRelativeNodes = allNodes.filter((item: Node) => {
      return relativeNodesIds.indexOf(item.get('id')) === -1;
    });
    return {
      relativeEdges,
      unRelativeEdges,
      relativeNodes,
      unRelativeNodes,
    };
  },
  onClick(e: G6Event) {
    const { keydown, graph } = this as any; // eslint-disable-line
    const currentNode = e.item;
    const { relativeEdges, unRelativeEdges, relativeNodes, unRelativeNodes } = this.process(currentNode);
    // 单选
    if (!keydown) {
      this.clearStates();

      relativeNodes.forEach((node: Node) => {
        if (currentNode.get('id') === node.get('id')) {
          graph.setItemState(currentNode, 'selected', true);
        } else {
          graph.setItemState(node, 'highlight.dark', false);
          graph.setItemState(node, 'highlight.light', true);
        }
      });
      unRelativeNodes.forEach((node: Node) => {
        graph.setItemState(node, 'highlight.light', false);
        graph.setItemState(node, 'highlight.dark', true);
      });
      relativeEdges.forEach((edge: Edge) => {
        edge.toFront();
        graph.setItemState(edge, 'highlight.dark', false);
        graph.setItemState(edge, 'highlight.light', true);
      });
      unRelativeEdges.forEach(edge => {
        edge.toBack();
        graph.setItemState(edge, 'highlight.light', false);
        graph.setItemState(edge, 'highlight.dark', true);
      });
    } else {
      //  按住ctrl 多选
      relativeEdges.forEach((edge: Edge) => {
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
