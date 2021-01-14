import Graphin from './Graphin';
import GraphinContext, { GraphinContextType } from './GraphinContext';
import Utils from './utils';
import Layout from './layout';
import Behaviors from './behaviors';
import registerGraphinForce from './layout/inner/registerGraphinForce';
import registerRenderLayout from './layout/inner/registerRenderLayout';
import { registerGraphinCircle, registerGraphinLine } from './shape';
/** export type */
import { NodeStyle, EdgeStyle } from './typings/type';

/** 注册 Graphin force 布局 */
registerGraphinForce();
/** 注册 Graphin render 布局 */
registerRenderLayout();

/** 注册 Graphin Circle Node */
registerGraphinCircle();

/** 注册 Graphin line Edge */
registerGraphinLine();

/** export */
export default Graphin;
export { Utils, Layout, GraphinContext, Behaviors };

export { GraphinContextType, NodeStyle, EdgeStyle };
export {
  /** export G6 */
  default as G6,
  /** export G6 Type  */
  Graph,
  IG6GraphEvent,
  GraphData,
  TreeGraphData,
  NodeConfig,
  EdgeConfig,
} from '@antv/g6';

export interface GraphEvent extends MouseEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}
