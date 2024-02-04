import { proxy, ref } from 'valtio';
import type { Graph } from '@antv/graphin';
import type { IModel } from '../types';

class Model implements IModel {
  graph = ref<Graph[]>([]);
  panel = {
    open: false,
  };
  sider = {
    open: true,
  };
  interaction = {
    clickNode: undefined,
    clickEdge: undefined,
    selectedNodes: [],
    selectedEdges: [],
    selectedCombo: [],
  };
  isReady = false;
  application: undefined;

  constructor() {}

  get(name: string) {
    if (name === 'graph') {
      return this.graph[0];
    }
    return this[name];
  }
}
export const SDKModel = proxy(new Model());
