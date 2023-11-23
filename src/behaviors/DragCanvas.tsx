import * as React from 'react';
import useBehaviorHook from './useBehaviorHook';

const defaultConfig = {
  /** 允许拖拽方向，支持'x'，'y'，'both'，默认方向为 'both'； */
  direction: 'both',
  /** 是否开启优化，开启后拖动画布过程中隐藏所有的边及节点上非 keyShape 部分，默认关闭； */
  enableOptimize: false,
  /**
   * drag-canvas 可拖动的扩展范围，默认为 0，即最多可以拖动一屏的位置
   *  当设置的值大于 0 时，即拖动可以超过一屏
   * 当设置的值小于 0 时，相当于缩小了可拖动范围
   * 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
   */
  scalableRange: 0,
  /**  是否允许触发该操作； */
  shouldBegin: () => {
    return true;
  },
  /** 是否禁用该功能 */
  disabled: false,
};

export type IDragCanvasProps = Partial<typeof defaultConfig>;

const DragCanvas: React.FunctionComponent<IDragCanvasProps> = props => {
  useBehaviorHook({
    type: 'drag-canvas',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default DragCanvas;
