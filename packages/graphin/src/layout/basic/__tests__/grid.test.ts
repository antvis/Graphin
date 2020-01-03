import { Data } from '../../../types';
import GridLayout, { GridLayoutOptions } from '../grid';
import json from './__mock__/concentric.input.json';

const gridLayoutOption = {
  /** 布局范围的宽度 */
  width: 600,
  /** 布局范围的高度 */
  height: 300,
  /** 节点间的间距，上下左右均是一致的 */
  nodeSep: 100,
  /** 节点的大小，单位px */
  nodeSize: 50,
};

const data: Data = json as any; // eslint-disable-line

describe('Grid Layout', () => {
  it('Should return result that matches snapshot', () => {
    expect(GridLayout(data, gridLayoutOption as GridLayoutOptions)).toMatchSnapshot();
  });
});
