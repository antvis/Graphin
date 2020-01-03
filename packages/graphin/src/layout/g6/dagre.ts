import G6 from '@antv/g6';
import { cloneDeep } from 'lodash';
import { LayoutOptionBase, Data } from '../../types';

export interface DagreLayoutOption extends LayoutOptionBase {
  /** 中心点坐标 */
  center: [number, number];
  /** 节点大小 */
  nodeSize: [number, number];
  /**  节点水平间距(px) */
  nodesep: number;
  /** 每一层节点之间间距 */
  ranksep: number;
  /** 防止位置 */
  align: string; // TODO 更换为枚举值
}

const dagreLayout = (data: Data, options: DagreLayoutOption): Data => {
  const source = cloneDeep(data);
  // eslint-disable-next-line new-cap
  const layout = new G6.Layout.dagre({
    type: 'dagre',
    ...options,
  });

  layout.init(source);
  layout.execute();
  return {
    nodes: layout.nodes,
    edges: data.edges,
  };

  // graph.positionsAnimate();
};
export default dagreLayout;
