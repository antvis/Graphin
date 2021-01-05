import Graphin from './Graphin';
import GraphinContext from './GraphinContext';
import Utils from './utils';
import Layout from './layout';

import Behaviors from './behaviors';
import registerGraphinForce from './layout/inner/registerGraphinForce';
import registerRenderLayout from './layout/inner/registerRenderLayout';
import { registerGraphinCircle } from './shape';

export {
  /** G6类抛出去 */
  default as G6,
  /** 外部用户需要断言的 G6 类型 */
  Graph,
  IG6GraphEvent,
} from '@antv/g6';

export default Graphin;
export { Utils, Layout, GraphinContext, Behaviors };

export interface GraphEvent extends MouseEvent {
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}

/** 注册 Graphin force 布局 */
registerGraphinForce();
/** 注册 Graphin render 布局 */
registerRenderLayout();

/** 注册 Graphin Circle Node */
registerGraphinCircle();
