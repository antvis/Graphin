import * as React from 'react';
// @ts-expect-error
import type { ZoomCanvasOptions } from '@antv/g6';
import useBehavior from '../hooks/useBehavior';

const defaultConfig = {
  /** 缩放灵敏度，支持 1-10 的数值，默认灵敏度为 5； */
  sensitivity: 2,
  /** 最小缩放比例 */
  minZoom: undefined as number | undefined,
  /** 最大缩放比例 */
  maxZoom: undefined as number | undefined,
  /** 是否开启性能优化，默认为 false，设置为 true 开启，开启后缩放比例小于 optimizeZoom 时自动隐藏非 keyShape */
  enableOptimize: false,
  /** 当 enableOptimize 为 true 时起作用，默认值为 0.7，表示当缩放到哪个比例时开始隐藏非 keyShape； */
  optimizeZoom: 0.1,
  /** 在缩小画布时是否固定选定元素的描边粗细、文本大小、整体大小等，fixSelectedItems 是一个对象，有以下变量： */
  fixSelectedItems: {
    /** 固定元素的整体大小，优先级高于 fixSelectedItems.fixLineWidth 和 fixSelectedItems.fixLabel； */
    fixAll: false,
    /** 固定元素的 keyShape 的描边粗细； */
    fixLineWidth: false,
    /** 固定元素的文本大小。 */
    fixLabel: false,
    /** 将被固定的元素状态，被设置为该状态的节点将会在画布缩小时参与固定大小的计算，默认为 'selected'； */
    fixState: 'selected',
  },
  /** 是否禁用该功能 */
  disabled: false,
  animate: false,
  animateCfg: {
    duration: 500,
  },
};

const ZoomCanvas: React.FC<ZoomCanvasOptions> = props => {
  useBehavior({
    type: 'zoom-canvas',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default ZoomCanvas;
