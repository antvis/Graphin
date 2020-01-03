import G6, { Graph as GraphType } from '@antv/g6';
import { GraphinProps, ExtendedGraphOptions } from '../types';

export interface BehaviorModeItem {
  type: string;
  [key: string]: string | number | boolean | undefined;
}

interface BehaviorsMode {
  [mode: string]: (BehaviorModeItem | string)[];
}

const initGraph = (props: GraphinProps, graphDOM: HTMLDivElement, behaviorsMode: BehaviorsMode) => {
  const { clientWidth, clientHeight } = graphDOM;
  const defaultOptions: Partial<ExtendedGraphOptions> = {
    // initial canvas
    width: clientWidth,
    height: clientHeight,
    // initial viewport state:
    zoom: 1,
    pan: { x: clientWidth / 2, y: clientHeight / 2 },
    // interaction options:
    minZoom: 0.2,
    maxZoom: 10,
    disablePan: false, // 禁止画布平移
    disableZoom: false, // 禁用画布缩放
    disableDrag: false, // 禁用节点拖拽
    delegateNode: false, // 节点代理
    wheelSensitivity: 1, // 缩放的敏感度，我们在内部有不同设备的最佳匹配
    // rendering options:
    animate: true,
    animateCfg: {
      onFrame: null,
      duration: 500,
      easing: 'easeLinear',
    },
    plugins: [],
    modes: {
      default: [],
    },
  };

  const options: Partial<ExtendedGraphOptions> = {
    ...defaultOptions,
    ...(props.options || {}),
  };

  const {
    pan,
    zoom,
    width,
    height,
    // interaction options:
    minZoom,
    maxZoom,
    disableZoom, // 禁用画布缩放
    disablePan, // 禁用移动画布
    disableDrag, // 禁用节点拖拽

    wheelSensitivity, // 缩放的敏感度，我们在内部有不同设备的最佳匹配
    // rendering options:
    animate,
    animateCfg,
    plugins,
  } = options as ExtendedGraphOptions;

  const defaultModes: (string | BehaviorModeItem)[] = ['click-select'];

  if (!disablePan) {
    defaultModes.push('drag-canvas');
  }
  if (!disableDrag) {
    defaultModes.push({
      type: 'drag-node',
      delegate: false,
    });
  }
  if (!disableZoom) {
    defaultModes.push({
      type: 'zoom-canvas',
      sensitivity: wheelSensitivity,
    });
  }

  const instance: GraphType = new G6.Graph({
    container: graphDOM,
    renderer: 'canvas',

    width,
    height,
    animate,
    animateCfg,
    minZoom,
    maxZoom,
    plugins,
    modes: {
      default: [...defaultModes, ...options.modes!.default!, ...behaviorsMode.default],
    },
  });

  // 平移
  if (pan) instance.moveTo(pan.x, pan.y);

  // 缩放
  if (zoom) instance.zoomTo(zoom, pan!);

  return {
    options: props.options || defaultOptions,
    instance,
    width: clientWidth,
    height: clientHeight,
  };
};

export default initGraph;
