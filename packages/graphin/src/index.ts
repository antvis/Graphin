import Graphin from './Graphin';
import GraphinContext from './GraphinContext';
import Utils from './utils';
import Layout from './layout';

import Behaviors from './behaviors';

export { default as G6 } from '@antv/g6';
import registerGraphinForce from './layout/registerGraphinForce';
export default Graphin;
export { Utils, Layout, GraphinContext, Behaviors };

export { IG6GraphEvent } from '@antv/g6/es/types';

export interface GraphEvent extends MouseEvent {
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
}

/** 注册 Graphin force 布局 */
registerGraphinForce();
