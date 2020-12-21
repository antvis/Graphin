import * as React from 'react';
import useBehaviorHook from './useBehaviorHook';
const defaultConfig = {
  /** 是否禁用该功能 */
  disabled: false,
  /** 是否在拖拽节点时更新所有与之相连的边，默认为 true  */
  updateEdge: true,
  /** 节点拖拽时的绘图属性，默认为 { strokeOpacity: 0.6, fillOpacity: 0.6 } */
  delegateStyle: {},
  // 是否开启delegate
  enableDelegate: false,
  // 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
  onlyChangeComboSize: false,
  // 拖动过程中目标 combo 状态样式
  comboActiveState: '',
  selectedState: 'selected',
};

export type IDragCanvasProps = Partial<typeof defaultConfig>;

const DragNode: React.FunctionComponent<IDragCanvasProps> = props => {
  useBehaviorHook({
    type: 'drag-node',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default DragNode;
