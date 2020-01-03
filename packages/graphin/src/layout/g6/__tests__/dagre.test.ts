import { Data } from '../../../types';
import DagreLayout, { DagreLayoutOption } from '../dagre';
import json from '../../basic/__tests__/__mock__/concentric.input.json';

const defaultOptions = {
  /** 中心点坐标 */
  center: [200 / 2, 200 / 2],
  /** 节点大小 */
  nodeSize: [50, 50],
  /**  节点水平间距(px) */
  nodesep: 12,
  /** 每一层节点之间间距 */
  ranksep: 50,
  /** 防止位置 */
  align: 'UL',
};

const data: Data = json as any; // eslint-disable-line

describe('Dagre Layout', () => {
  it('Should return result that matches snapshot', () => {
    expect(DagreLayout(data, defaultOptions as DagreLayoutOption)).toMatchSnapshot();
  });
});
