import G6 from '@antv/g6';
import Graphin from './Graphin';
import Utils from './utils';
import Layout from './layout';

export default Graphin;
export { Utils, Layout };

export * from './types';

/** export types  */
export type Graph = G6.Graph;
export type GraphNode = G6.Node;
export type GraphEdge = G6.Edge;

export interface GraphEvent extends MouseEvent {
  item: G6.Node & G6.Edge;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}
