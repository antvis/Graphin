import * as React from 'react';
import useBehaviorHook from './useBehaviorHook';

const defaultConfig = {
  /**
   * @description 是否禁用该功能
   * @default false
   */
  disabled: false,
  /**
   * @description 是否在拖拽节点时更新所有与之相连的边，默认为 true
   * @default true
   */
  updateEdge: true,
  /**
   * @description 节点拖拽时的绘图属性
   * @default { strokeOpacity: 0.6, fillOpacity: 0.6 }
   */
  delegateStyle: {},
  /**
   * @description 是否开启delegate
   * @default false
   */
  enableDelegate: false,
  /**
   * @description 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
   * @default false
   */
  onlyChangeComboSize: false,
  /**
   * @description 拖动过程中目标 combo 状态样式
   * @default ''
   */
  comboActiveState: '',
  /**
   * @description 选中样式
   * @default selected
   */
  selectedState: 'selected',
};

export type DragNodeProps = Partial<typeof defaultConfig>;

const DragNode: React.FunctionComponent<DragNodeProps> = props => {
  useBehaviorHook({
    type: 'drag-node',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default DragNode;
