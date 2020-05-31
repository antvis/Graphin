import { ReactNode } from 'react';
import G6 from '@antv/g6';
import { ComboConfig } from '@antv/g6/src/types';
import ForceLayout from './layout/force/ForceLayout';
import Graphin from './Graphin';
import { LayoutOption } from './controller/layout/defaultLayouts';
import { Item, EdgeConfig, NodeConfig } from '@antv/g6/lib/types';
import G6ItemNode from '@antv/g6/lib/item/node';

export type GraphClass = typeof G6['Graph'];
export type Graph = InstanceType<GraphClass>;
type GraphOptions = ConstructorParameters<GraphClass>[0];
export type GraphNode = NodeConfig;
export type GraphEdge = EdgeConfig;

/** G6 没有暴露这个类型 */
export interface G6Event extends MouseEvent {
  item: Item;
  target: MouseEvent['target'];
}

export interface G6KeyboardEvent extends KeyboardEvent {
  item: Item;
  target: KeyboardEvent['target'];
}

/** Graphin 用到一些 G6 官方没有暴露的 API，所以需要 extend 官方的类型 */
export interface ExtendedGraphOptions extends GraphOptions {
  /**
   * 默认缩放比例
   */
  zoom?: number;

  pan?: { x: number; y: number };

  disablePan?: boolean; // 禁止画布平移
  disableZoom?: boolean; // 禁用画布缩放
  disableDrag?: boolean; // 禁用节点拖拽
  disableHighlight?: boolean; // 禁用highlight
  delegateNode?: boolean;
  wheelSensitivity?: number;
  isZoomOptimize?: (graph?: Graph, e?: G6Event) => boolean;
  keyShapeZoom?: number;
  autoFollowWithForce?: boolean;
  autoPinWithForce?: boolean;
  restartForceOnDrag?: boolean;
  [key: string]: any; // eslint-disable-line
}

// type CanvasKey = keyof Canvas;

// /** G6 没有暴露这个类型 */
// export interface Canvas {
//   get(key: CanvasKey): Canvas[CanvasKey];
//   width: number;
//   height: number;
// }

// export interface ExtendedGraph extends Graph {
//   /**
//    * 画布实例
//    */
//   canvas: Canvas;

//   nodes: Node[];

//   edges: Edge[];

//   autoPaint(): void;
// }

/** 默认节点样式 */
export interface NodeStyle {
  /** 节点的大小 */
  nodeSize?: number;
  /** 节点的主要颜色 */
  primaryColor?: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B] | string;
  /** 文本的字体大小 */
  fontSize?: number;
  /** 文本的字体颜色 */
  fontColor?: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B] | string;
  /** dark 置灰 */
  dark?: string;
  /** iconfont 的 font-family */
  fontFamily?: string;
  /** icon 的类型 */
  icon?: string;
  /** icon大小 */
  iconSize?: number;
  /** icon颜色 */
  iconColor?: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B] | string;
  /** 标记 */
  tag?: {
    outDegree: boolean;
  };
  [key: string]: string | number | undefined | object;
}

// TODO: 考虑一下重新调整style的内容组织方式
// export interface InnerNodeStyle {
//   size: number;
//   tag: {
//     outDegree: boolean;
//   },
//   icon: {
//     size: number;
//     fontFamily?: string;
//     color: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B];
//   };
//   label: {
//     size: number;
//     position: 'inner' | 'bottom';
//     color: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B];
//   }
//   border: {
//     color: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B];
//   }
// }

export interface Node {
  /** 节点源数据 */
  data: {
    /** 唯一标示ID，必选 */
    id: string;
    /** comboId */
    comboId?: string;
    /** 节点数据类型 */
    type?: string;
    /** 节点文本 */
    label?: string;
    /** 节点属性 */
    properties?: any[]; // eslint-disable-line
  };
  /** 唯一标示ID，必选 */
  id: string;
  /** comboId */
  comboId?: string;
  /** 节点类型 */
  shape?: string;
  /** 节点类型 */
  type?: string;
  /** 节点文本 */
  label?: string;
  /** 节点样式 */
  style?: Partial<NodeStyle>;
  /** 内置节点属性 */
  // innerNodeStyle?: Partial<InnerNodeStyle>;
  /** 节点位置信息 */
  x?: number;
  y?: number;
  /** 内置的布局，追加的额外属性 */
  layout?: NodeLayoutType;
  /** 节点度数 */
  degree?: number;
  /** 徽标文案 */
  badge?: number | string;
  searchTypes?: string[];

  /** User Defined Propery */
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type G6Node = Node & {
  x: number;
  y: number;
};

export interface NodeLayoutType {
  /** 节点度数 */
  degree?: number;
  /** 力导布局 */
  force?: {
    mass?: number;
  };
  /** 同心圆布局 */
  concentric?: {
    outerR?: number;
    center: {
      x: number;
      y: number;
    };
    theta: number;
  };
}

type COLOR_RGB_R = number;
type COLOR_RGB_G = number;
type COLOR_RGB_B = number;

/**
 * 默认节点样式
 * TODO: 与Style设计合并
 * */
export interface InnerEdgeStyle {
  /** Line 样式 */
  line: {
    width: number;
    color: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B];
    dash?: [number, number];
  };
  /** Label样式 */
  label?: {
    size: number;
    color: [COLOR_RGB_R, COLOR_RGB_G, COLOR_RGB_B];
    family: string;
  };
  dark?: string;
  [key: string]: string | number | undefined | object;
}

export interface Edge {
  /** 边的数据，必选 */
  data: {
    /** 边的属性 */
    properties?: object[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  /** 边的源节点，必选 */
  source: string;
  /** 边的目标节点，必选 */
  target: string;
  /** 边的类型 */
  shape?: string;
  /** 边的类型 */
  type?: string;

  /** 边的文本 */
  label?: string;
  /** 边的样式 */
  style?: InnerEdgeStyle;

  id?: string;
  /** 边的弹簧长度，力导时使用 */
  spring?: number;

  /** User Defined Property */
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type G6Edge = Edge & {
  startPoint: G6Node;
  endPoint: G6Node;
  sourceNode: G6ItemNode;
  targetNode: G6ItemNode;
};

export type NodeData = Node['data'];
export type EdgeData = Edge['data'];

export interface Data {
  /** 节点 */
  nodes: Node[];
  /** 边 */
  edges: Edge[];
  /** combo */
  combos?: ComboConfig[];
}
export interface Layout {
  /** 布局名称，必选 */
  name: string;
  /** 布局配置，可选 */
  options?: object;
}

/** 用户自定义shape的样式 */
export interface NodeShape {
  name: string;
  shapeComponent?: ShapeComponent;
}
export interface EdgeShape {
  name: string;
  style?: object;
}

export interface ShapeComponent {
  shape?: string;
  type?: string;
  attrs: {
    /** 这个shape图形的ID，用户自定义，保证不重复即可 */
    id: string;
    // eslint-disable-next-line
    [key: string]: any;
  };
  isKeyShape?: boolean;
  noReset?: boolean;
}

export interface NodeShapeFunction {
  (node: Node): {
    /** 自定义Shape的名称，之后数据指定即可调用这个Shape定义 */
    shape?: string;
    type?: string;
    shapeComponents: ShapeComponent[];
    state: {
      [stateName: string]: {
        [id: string]: {
          [attr: string]: any; // eslint-disable-line
        };
      };
    };
  };
}

export interface ExtendNodeShape {
  name: string;
  render: NodeShapeFunction;
}
export interface ExtendLayout {
  /** 布局名称，唯一标示 */
  name: string;
  /** 布局展示名称 */
  desc: string;
  /** antd icon */
  icon: string;
  /** layout 布局执行函数 */
  layout: (
    data: Data,
    options: LayoutOption,
  ) => {
    data: Data;
    forceSimulation?: ForceSimulation;
  };
}
export interface ExtendMarker {
  /** 唯一标示名称 */
  name: string;
  /** Marker的Path路径 */
  path: string;
}

export interface IconFontMapItem {
  name: string;
  unicode_decimal: number;
}

export interface ExtendIcon {
  /** 字体名称 */
  fontFamily: string;
  /** iconfont 的 class name 和 unicode decimal 的映射 */
  map: IconFontMapItem[];
}

export interface Register {
  /** 节点名称 */
  name: string;
  /** register执行函数,参数为G6对象 */
  register: (g6: typeof G6) => void;
}

export interface BehaviorRegister extends Register {
  options: any; // eslint-disable-line
  mode: string;
}

export interface GraphinProps {
  /** render */
  data: Data;
  /** options */
  options?: Partial<ExtendedGraphOptions>;
  /** layout */
  layout?: Layout;

  extend?: {
    layout?: (graphin: Graphin, prevProps: GraphinProps) => ExtendLayout[];
    nodeShape?: () => ExtendNodeShape[];
    marker?: () => ExtendMarker[];
    icon?: () => ExtendIcon[];
  };
  register?: {
    /** 通过G6原生方法，注册节点 */
    nodeShape?: (g6: typeof G6) => Register[];
    /** 通过G6原生方法，注册边 */
    edgeShape?: (g6: typeof G6) => Register[];
    /** 通过G6原生方法，注册事件 */
    behavior?: (g6: typeof G6) => BehaviorRegister[];
  };

  children?: ReactNode;

  [key: string]: GraphinProps[keyof GraphinProps];
}

export type ForceSimulation = ForceLayout;

export interface GraphinHistory extends GraphinState {
  graphSave: any; // eslint-disable-line
}

export interface GraphinState {
  isGraphReady: boolean;
  width: number;
  height: number;
  data: Data;
  graph?: Graph;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graphSave?: any;
  forceSimulation?: ForceSimulation | null;
}

export interface NodeModel {
  id: string;
  data: NodeData;
  shapeComponent: {};
  layout: {};
  x?: number;
  y?: number;
}

export interface LayoutOptionBase {
  graph: Graph;
  width: number;
  height: number;
  data: Data;
}
