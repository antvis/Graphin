import Graphin from './Graphin';
import GraphinContext, { GraphinContextType } from './GraphinContext';
import Utils from './utils';
import Layout from './layout';
import Behaviors from './behaviors';
import registerGraphinForce from './layout/inner/registerGraphinForce';
import registerPresetLayout from './layout/inner/registerPresetLayout';
import { registerGraphinCircle, registerGraphinLine } from './shape';
/** export type */
export { NodeStyle, EdgeStyle, GraphinData, GraphinTreeData } from './typings/type';
export { GraphinContextType };

/** 注册 Graphin force 布局 */
registerGraphinForce();
/** 注册 Graphin preset 布局 */
registerPresetLayout();

/** 注册 Graphin Circle Node */
registerGraphinCircle();

/** 注册 Graphin line Edge */
registerGraphinLine();

/** 解构静态方法 */
const { registerFontFamily } = Graphin;

/** export */
export default Graphin;
export { Utils, Layout, GraphinContext, Behaviors, registerFontFamily };

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
