export interface UserProperties {
  [key: string]: any;
}

/** 基础节点类型 */
type BaseNode = {
  /** ID，必须为字符串*/
  id: string;
};

export interface RestNode {
  /** 注册元素的名称 */
  type: string;
  /**  用户的数据 */
  data: any;
  /** 坐标X */
  x: number;
  /** 坐标Y */
  y: number;
  /** 节点的样式，默认为默认样式 */
  style: Partial<NodeStyle>;
  /**  节点当前的状态 */
  status: ElementStatus;
  /** 布局的相关信息 */
  layout: {
    /** 度数 */
    degree?: number;
    /** 力导参数 */
    force?: {
      mass?: number;
    };
  };
}

/** 基础边类型 */
type BaseEdge = {
  /** 边的 Source */
  source: string;
  /** 边的 Target */
  target: string;
};

interface EdgeStatus {
  [key: string]: {
    stroke: string;
    opacity: string;
    shadowColor: string;
    shadowBlur: number;
    animation?: {
      /**
       * dotted：表示边上虚线运动的动画效果
       * dot：表示边上一个圆点的运动效果
       * grow：边从无到有出现的效果
       */
      type: 'dotted' | 'dot' | 'grow';
      // 一次动画的时长
      duration: number;
      // 动画函数，详情参考 https://github.com/d3/d3/blob/master/API.md#easings-d3-ease
      easing: string;
      // 动画执行延迟时间
      delay: number;
      // 是否重复执行动画
      repeat: boolean;
    };
  };
}

export interface RestEdge {
  /** 边的类型 */
  type?: string;
  /** 边的数据 */
  style: Partial<EdgeStyle>;
  /**  边当前的状态 */
  status: EdgeStatus;
  layout: {
    /** 边的弹簧长度，力导时使用 */
    spring?: number;
  };
}

/**
 * 节点的形状
 */
export enum NodeShape {
  CIRCLE = 'circle',
  RECT = 'rect',
}

export interface IGraphData {
  nodes: IUserNode[] | [];
  edges: IUserEdge[] | [];
  combos: Combo[] | [] | undefined | null;
  children?: any;
}
export interface ITreeData {
  id: string;
  children: Partial<ITreeData>[];
}

export interface GraphinProps {
  /** 主题 */
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    primarySize: number;
  };
  /** 数据 */
  data: ITreeData | IGraphData;
  /** 布局 */
  layout?: Layout;

  /** 默认的节点样式 */
  defaultNode?: Partial<NodeStyle> | any;
  /** 默认的边样式 */
  defaultEdge?: Partial<EdgeStyle> | any;
  /** 默认的Combo样式 */
  defaultCombo?: Partial<ComboStyle> | any;
  /**
   * 节点默认状态样式
   *
   */
  nodeStateStyles?: {};
  /**
   * 边默认状态样式
   */
  edgeStateStyles?: {};
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /**
   * 是否启用全局动画
   */
  animate?: false;
  /* 动画设置,仅在 animate 为 true 时有效 */
  animateCfg?: {
    /**
     * 帧回调函数，用于自定义节点运动路径，为空时线性运动
     */
    onFrame: undefined;
    /**
     * 动画时长(ms)
     */
    duration: number;
    /**
     * 指定动画动效
     */
    easing: string;
  };
  /**
   * 边直接连接到节点的中心，不再考虑锚点
   */
  linkCenter?: boolean;

  /**
   * 多边配置
   */
  parallel: Partial<{
    // 多边之间的偏移量
    offsetDiff: number;
    // 多条边时边的类型
    multiEdgeType: string;
    // 单条边的类型
    singleEdgeType: string;
    // 自环边的类型
    loopEdgeType: string;
  }>;

  // children: React.ReactChildren;
}

export interface IUserNode extends BaseNode, Partial<RestNode>, UserProperties {}
export interface GraphinNode extends BaseNode, RestNode, UserProperties {}

export interface EdgeStyle {
  /** 边的类型 */
  type: 'graphin-line' | 'line';
  label: {
    value: string | number;
    position: '' | 'T';
    autoRote: boolean;
  };
}

export interface IUserEdge extends BaseEdge, Partial<RestEdge>, UserProperties {}
export interface GraphinEdge extends BaseEdge, RestEdge, UserProperties {}

export interface Combo {}

export type NodeStyleLabel = Partial<{
  /** label的名称 */
  value: string;
  /** 展示位置 */
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /** 文本填充色 */
  fill: string;
  /** 文本大小 */
  fontSize: number;
  /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
  offset: number;
}>;

export type NodeStyleIcon = Partial<{
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text';
  /** 根据类型，填写对应的值 */
  value: string;
  /** 图标大小 */
  size: number | number[];
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: string;
  fontFamily: string;
}>;

export type NodeStyleBadge = Partial<{
  /** 放置的位置，ef：LT（left top）左上角 */
  position: 'LT' | 'RT' | 'RB' | 'LB';
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text';
  value: number | string;
  // type = image 时生效，表示图片的宽度和高度
  size: [number, number] | [number];
  /** 徽标填充色 */
  fill: string;
  /** 徽标描边色 */
  stroke: string;
  /** 徽标内文本的颜色 */
  color: string;
  fontSize: number;
  fontFamily: string;
  // badge 中文本距离四周的偏移量
  padding: number;
  // badge 在 x 和 y 方向上的偏移量
  offset: [number, number];
}>;

export interface NodeStyle {
  /** 节点的主要容器 */
  keyshape: {
    /** 节点的大小 */
    size: number | [number] | [number, number];
    /** 填充色 */
    fill: string;
    /** 包围边颜色 */
    stroke: string;
    /** 边框的宽度 */
    lineWidth: number;
  };
  /** 节点的文本 */
  label: NodeStyleLabel;
  /** 节点的中间位置图标区域 */
  icon: NodeStyleIcon;
  /** 节点的徽标 */
  badges: NodeStyleBadge[];
  /** 光环 */
  halo: NodeStyleHalo;
}

export interface NodeStyleHalo {
  /** 大小 */
  size: number | [number] | [number, number];
  /** 填充色 */
  fill: string;
  /** 包围边颜色 */
  stroke: string;
  /** 边框的宽度 */
  lineWidth: number;
  /** 透明度 */
  opacity: number;
}
export interface ComboStyle {}

export interface Layout {
  /** 布局名称，必选 */
  type: string;
  /** 布局配置，可选 */
  [key: string]: any; // eslint-disable-line
}

export interface IconLoader {
  (): {
    fontFamily: string;
    glyphs: {
      name: string;
      unicode_decimal: number;
      [key: string]: any;
    }[];
  };
}
