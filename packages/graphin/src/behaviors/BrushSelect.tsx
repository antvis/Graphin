import * as React from 'react';
import useBehaviorHook from './useBehaviorHook';

const DEFAULT_TRIGGER = 'shift';

const defaultConfig = {
  /** 是否禁用该功能 */
  disabled: false,
  /** 拖动框选框的样式，包括 fill、fillOpacity、stroke 和 lineWidth 四个属性; */
  brushStyle: {
    fill: '#EEF6FF',
    fillOpacity: 0.4,
    stroke: '#DDEEFE',
    lineWidth: 1,
  },
  /** 选中节点时的回调，参数 nodes 表示选中的节点； */
  onSelect: () => {},
  /** 取消选中节点时的回调，参数 nodes 表示取消选中的节点； */
  onDeselect: () => {},
  /** 选中的状态，默认值为 'selected' */
  selectedState: 'selected',
  /** 触发框选的动作，默认为 'shift'，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: 'shift'、'ctrl' / 'control'、'alt' 和 'drag' ，不区分大小写 */
  trigger: DEFAULT_TRIGGER,
  /** 框选过程中是否选中边，默认为 true，用户配置为 false 时，则不选中边； */
  includeEdges: true,
  /** Whether to include combos in the selection */
  includeCombos: false,
};

export type IDragCanvasProps = Partial<typeof defaultConfig>;

const BrushSelect: React.FunctionComponent<IDragCanvasProps> = props => {
  useBehaviorHook({
    type: 'brush-select',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default BrushSelect;
