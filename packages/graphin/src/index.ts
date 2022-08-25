import Behaviors from './behaviors';
import Components from './components';
import Graphin from './Graphin';
import GraphinContext from './GraphinContext';
import registerGraphinForce from './layout/inner/registerGraphinForce';
import registerPresetLayout from './layout/inner/registerPresetLayout';
import { registerGraphinCircle, registerGraphinLine } from './shape';
import Utils from './utils';

export { default as G6 } from '@antv/g6';
/** export type */
export type {
  /** export G6 Type  */
  EdgeConfig,
  Graph,
  GraphData,
  IG6GraphEvent,
  NodeConfig,
  TreeGraphData,
} from '@antv/g6';
/** Components Typing */
export type { ContextMenuValue } from './components/ContextMenu/index';
export type { HullCfg } from './components/Hull/index';
export type { LegendChildrenProps, OptionType as LegendOptionType } from './components/Legend/typing';
export type { TooltipValue } from './components/Tooltip/index';
export type { GraphinContextType } from './GraphinContext';
export type { ThemeType } from './theme';
export type { EdgeStyle, GraphinData, GraphinTreeData, GraphinProps,IUserEdge, IUserNode, Layout, NodeStyle } from './typings/type';
export { Utils, GraphinContext, Behaviors, Components, registerFontFamily };

export interface GraphEvent extends MouseEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}

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
