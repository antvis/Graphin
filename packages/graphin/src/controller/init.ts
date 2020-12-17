import G6, { Graph as GraphType } from '@antv/g6';
import { GraphinProps, ExtendedGraphOptions } from '../types';

export interface BehaviorModeItem {
  type: string;
  [key: string]: string | number | boolean | undefined;
}

interface BehaviorsMode {
  [mode: string]: (BehaviorModeItem | string)[];
}

const ZOOM_RANGE = [0.2, 10];
export let graphinInstance: any;

function generateDefaultGraphOptions(graphDOM: HTMLDivElement): Partial<ExtendedGraphOptions> {
  const { clientWidth, clientHeight } = graphDOM;
  return {
    container: graphDOM,
    renderer: 'canvas',
    width: clientWidth,
    height: clientHeight,
    // initial viewport state:
    zoom: 1,
    // pan: { x: clientWidth / 2, y: clientHeight / 2 },
    // interaction options:
    minZoom: ZOOM_RANGE[0],
    maxZoom: ZOOM_RANGE[1],
    // rendering options:
    animate: true,
    animateCfg: {
      onFrame: undefined,
      duration: 500,
      easing: 'easeLinear',
    },
    plugins: [],
    modes: {
      default: [],
    },
    // Graphin unique options
    disablePan: false,
    disableZoom: false,
    disableDrag: false,
    wheelSensitivity: 1,

    // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理:https://g6.antv.vision/zh/docs/manual/middle/combo
    groupByTypes: false,

    // 默认关闭多边设置
    autoPolyEdge: false,
    // 默认开启多边设置
    autoLoopEdge: true,
  };
}

/** Graphin built-in g6 behaviors */
function generateInnerBehaviors(options: {
  pan: boolean;
  zoom: {
    enable: boolean;
    sensitivity?: number;
  };
  brush: boolean;
  select: boolean;
  node: {
    drag: boolean;
  };
  combo: {
    drag: boolean;
    collapseExpand: boolean;
  };
}) {
  return [
    // 拖拽画布
    {
      type: 'drag-canvas',
      disable: !options.pan,
      options: {},
    },
    // 缩放画布
    {
      type: 'zoom-canvas',
      disable: !options.zoom.enable,
      options: {
        sensitivity: options.zoom.sensitivity,
      },
    },
    // 画布框选
    {
      type: 'brush-select',
      disable: !options.brush,
      options: {
        trigger: 'shift',
        includeEdges: false,
      },
    },
    // 点击选择
    {
      type: 'click-select',
      disable: !options.select,
      options: {
        multiple: true, // 允许多选
        trigger: 'alt',
      },
    },
    // 拖拽节点
    {
      type: 'drag-node',
      disable: !options.node.drag,
      options: {},
    },
    // combo
    {
      type: 'drag-combo',
      disable: !options.combo.drag,
      options: {},
    },
    {
      type: 'collapse-expand-combo',
      disable: !options.combo.collapseExpand,
      options: {},
    },
  ];
}

/**
 * 缩放
 *
 * @param {(number | undefined)} zoom
 * @param {GraphType} instance
 * @param {({ x: number; y: number; } | undefined)} center
 * @returns
 */
function doZoom(zoom: number | undefined, instance: GraphType, center: { x: number; y: number } | undefined) {
  if (!zoom) return;

  let limitedZoom = zoom;
  limitedZoom = zoom < ZOOM_RANGE[0] ? ZOOM_RANGE[0] : limitedZoom;
  limitedZoom = zoom > ZOOM_RANGE[1] ? ZOOM_RANGE[1] : limitedZoom;

  if (zoom < ZOOM_RANGE[0] || zoom > ZOOM_RANGE[1])
    console.warn(`Zoom 数值溢出，最大只支持 ${ZOOM_RANGE.join('-')}。 更改 Zoom 为${limitedZoom}`);

  instance.zoomTo(limitedZoom, center!);
}

/**
 * 平移
 *
 * @param {({ x: number; y: number; } | undefined)} pan
 * @param {GraphType} instance
 */
function doPan(pan: { x: number; y: number } | undefined, instance: GraphType) {
  if (pan) instance.moveTo(pan.x, pan.y);
}

/**
 * 关闭局部刷新
 * TODO: 目前@antv/g的局部刷新还不稳定，仍然存在鬼影问题，暂时关闭
 *
 * @param {GraphType} instance
 */
function switchLocalRefresh(instance: GraphType, on = true) {
  // close local refresh issue to avoid clip ghost
  instance.get('canvas').set('localRefresh', on);
}

export const initGraphAfterRender = (props: GraphinProps, graphDOM: HTMLDivElement, instance: GraphType) => {
  const { options = {} } = props;
  const { pan, zoom } = options;

  // 平移
  if (pan) instance.moveTo(pan.x, pan.y);

  // 缩放
  if (zoom) instance.zoomTo(zoom, pan!);
};

function init(props: GraphinProps, graphDOM: HTMLDivElement, behaviorsMode: BehaviorsMode) {
  /** merged options */
  const options: Partial<ExtendedGraphOptions> = {
    ...generateDefaultGraphOptions(graphDOM),
    ...(props.options || {}),
  };

  /** deconstruct g6 Options */
  const {
    disableZoom, // 禁用画布缩放
    disablePan, // 禁用移动画布
    disableDrag, // 禁用节点拖拽
    disableClick, // 禁止节点点击
    disableBrush, // 禁止框选
    wheelSensitivity, // 缩放的敏感度，我们在内部有不同设备的最佳匹配
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pan: _pan, // 默认移动到位置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    zoom: _zoom, // 默认缩放比例

    modes, // 需要内置default mode

    ...g6Options
  } = options as ExtendedGraphOptions;

  const defaultModes = generateInnerBehaviors({
    pan: !disablePan,
    zoom: {
      sensitivity: wheelSensitivity,
      enable: !disableZoom,
    },
    brush: !disableBrush,
    select: !disableClick,
    node: {
      drag: !disableDrag,
    },
    combo: {
      drag: true,
      collapseExpand: true,
    },
  })
    .filter(c => {
      return !c.disable;
    })
    .map(c => {
      return {
        type: c.type,
        ...c.options,
      };
    });

  const instance: GraphType = new G6.Graph({
    ...g6Options,
    animate: true,
    modes: {
      ...props.options.modes,
      ...behaviorsMode, // Add multiple G6 behavior modes
      default: [...defaultModes, ...modes!.default!, ...behaviorsMode.default],
    },
  });

  return [instance, options] as [GraphType, Partial<ExtendedGraphOptions>];
}

const initGraph = (props: GraphinProps, graphDOM: HTMLDivElement, behaviorsMode: BehaviorsMode) => {
  const [instance, options] = init(props, graphDOM, behaviorsMode);

  switchLocalRefresh(instance, true);
  doPan(options.pan, instance);
  doZoom(options.zoom, instance, options.pan);

  return {
    options: options || generateDefaultGraphOptions(graphDOM),
    instance,
    width: graphDOM.clientWidth,
    height: graphDOM.clientHeight,
  };
};

export default initGraph;
