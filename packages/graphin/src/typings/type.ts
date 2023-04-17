/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO : remove any type
import { Graph, ShapeStyle } from '@antv/g6';
import React from 'react';
import { ThemeType } from '../theme';

export interface UserProperties {
  [key: string]: any;
}

/** 基础节点类型 */
interface BaseNode {
  /** ID，必须为字符串 */
  id: string;
}

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
  status: Partial<ElementStatus>;
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
export interface ElementStatus {
  /** 是否选中 */
  selected: boolean;
  /** 是否Hover */
  hover: boolean;
  /** 是否激活 */
  active: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 用户自定义的状态 */
  [key: string]: boolean;
}

/** 基础边类型 */
interface BaseEdge {
  /** 边的 Source */
  source: string;
  /** 边的 Target */
  target: string;
}

export interface RestEdge {
  /** 边的类型 */
  type?: string;
  /** 边的数据 */
  style: Partial<EdgeStyle>;
  /**  边当前的状态 */
  status: Partial<ElementStatus>;
  layout: {
    /** 边的弹簧长度，力导时使用 */
    spring?: number;
  };
}

export interface GraphinData {
  nodes: IUserNode[];
  edges: IUserEdge[];
  combos?: Combo[] | undefined | null;
}
export interface GraphinTreeData {
  id: string;
  children?: GraphinTreeData[];
  /** 坐标X */
  x?: number;
  /** 坐标Y */
  y?: number;
  /** 节点的样式 */
  style?: Partial<NodeStyle>;
  /**  节点当前的状态 */
  status?: Partial<ElementStatus>;
}

export interface GraphinProps {
  /** container id */
  containerId?: string;
  /** container className */
  containerStyle?: React.CSSProperties;
  /** user custom styles */
  style?: React.CSSProperties;
  /** 主题 */
  theme?: Partial<ThemeType>;
  /** 数据 */
  data: GraphinTreeData | GraphinData;
  /** 布局 */
  layout?: Layout;
  /** 模式 G6的options.modes,建议使用 behaviors components 代替 */
  modes?: any;

  /** 布局后的回调函数 */
  handleAfterLayout?: (graph: Graph) => void;

  /** 节点的默认样式配置 */
  defaultNode?: Partial<{
    type?: string;
    style: NodeStyle;
    [key: string]: any;
  }>;
  /** 边的默认样式配置 */
  defaultEdge?: Partial<{
    type?: 'graphin-line';
    style: EdgeStyle;
    [key: string]: any;
  }>;
  /** Combo 的默认样式配置  */
  defaultCombo?: Partial<{
    type?: string;
    style: ComboStyle;
    labelCfg?: {
      position?: 'center' | 'top' | 'left' | 'right' | 'bottom';
      refX?: number;
      refY?: number;
      style?: ShapeStyle;
    };
    [key: string]: any;
  }>;

  /** 默认的节点 状态样式 */
  nodeStateStyles?: {
    status: Partial<NodeStyle['status']>;
  };
  /** 默认的边 状态样式 */
  edgeStateStyles?: {
    status: Partial<EdgeStyle['status']>;
  };
  /** 默认的Combo样式 */
  comboStateStyles?: {
    status: Partial<ComboStyle['status']>;
  };

  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /**
   * 是否启用全局动画
   */
  animate?: boolean;
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
  parallel?: Partial<{
    // 多边之间的偏移量
    offsetDiff: number;
    // 多条边时边的类型
    multiEdgeType: string;
    // 单条边的类型
    singleEdgeType: string;
    // 自环边的类型
    loopEdgeType: string;
  }>;
  /** user custom props */
  [key: string]: any;

  // children: React.ReactChildren;

  /**
   * Text direction, to support languages like Arabic and Hebrew.
   */
  dir?: 'ltr' | 'rtl';
  willUnmount?: () => void;
}

export interface IUserNode extends BaseNode, Partial<RestNode>, UserProperties {}
export interface GraphinNode extends BaseNode, RestNode, UserProperties {}

export interface EdgeStyle {
  /** 边的类型 */
  type?: 'graphin-line';
  /** keyshape */
  keyshape: Partial<
    {
      /** 边的类型：目前是line 直线，未来可以扩展 */
      type: string;
      /** 边宽 */
      lineWidth: number;
      /** 边的填充色 */
      stroke: string;
      /** 透明度 */
      opacity: number;
      /** 虚线Dash */
      lineDash: number[];
      /** 边的交互区域扩展 */
      lineAppendWidth: number;
      /** 鼠标样式 */
      cursor: string;
      /** 末尾箭头 */
      endArrow: {
        path?: string;
        fill?: string;
        stroke?: string;
        [key: string]: any;
      };
      /** 多边的设置，仅当keyshape.type 为poly时有效 */
      poly: {
        // 多边时候距离中心线的距离，比如40代表距离中心线40px，-40代表距离中心线反向40px
        distance?: number;
      };
      /** 自环边的设置，distance 表示环的附近半径，dx 表示边起点与终点的 x 轴偏移量 */
      loop: {
        /** 多边时候距离中心线的距离，比如 40 代表距离环图起始点高度40px，80 代表距离起始点高度 80px  */
        distance?: number;
        dx?: number;
      };
    } & CommondAttrsStyle
  >;
  /** 标签 */
  label: Partial<
    {
      /** 值 */
      value: string | number;
      /** 字体填充色 */
      fill: string;
      /** 字体大小 */
      fontSize: number;
      /**
       * @description 偏移位置
       * @default [0,0]
       */
      offset: number[];
      /** 其他配置 */
      /** 字体的背景色 */
      background: {
        /**
         * @description 背景的宽度
         * @default 根据fontSize动态计算
         */
        width?: number;
        /**
         * @description 背景的高度
         * @default 根据fontSize动态计算
         */
        height?: number;
        /**
         * @description 背景的边框色
         * @default 默认是label.stroke
         */
        stroke?: string;
        /**
         * @description 背景填充色
         */
        fill?: string;
        /**
         * @description 背景的圆角度
         * @description 6
         */
        radius?: number;
        /**
         *  @description 透明度，默认值为 1；
         */
        opacity?: number;
      };
    } & CommondAttrsStyle
  >;
  /** 光晕 */
  halo: Partial<
    {
      type: string;
      lineWidth: number;
      stroke: string;
      opacity: number;
      lineDash: number[];
      lineAppendWidth: number;
      cursor: string;
      /**
       * @description 是否展示
       * @default false
       */
      visible: boolean;
    } & CommondAttrsStyle
  >;
  /** 动画 */
  animate: Partial<
    {
      /**
       * @description 动画类型
       */
      type: 'line-dash' | 'line-growth' | 'circle-running';
      /**
       * @description 当类型为'circle-running'时候小圆球的颜色
       */
      color: string;
      /**
       * @description 动画是否重复
       * @default true
       */
      repeat: boolean;
      /**
       * @description 动画时长
       * @default 3000
       */
      duration: number;
      /**
       * @description 是否展示
       * @default false
       */
      visible: boolean;
    } & CommondAttrsStyle
  >;
  /** 状态样式 */
  status: Partial<{
    selected: Partial<EdgeStyle>;
    hover: Partial<EdgeStyle>;
    disabled: Partial<EdgeStyle>;
    [key: string]: any;
  }>;
}

export interface IUserEdge extends BaseEdge, Partial<RestEdge>, UserProperties {}
export interface GraphinEdge extends BaseEdge, RestEdge, UserProperties {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Combo {}

// https://g.antv.vision/zh/docs/api/shape/attrs
export interface CommondAttrsStyle {
  /**
   * @description 填充色、渐变或 纹理，默认值为空；
   */
  fill: string | undefined;
  /**
   * @description 描边色、渐变或 纹理，默认值为空；
   */
  stroke: string;
  /**
   *  @description 透明度，默认值为 1；
   */
  opacity: number;
  /**
   * @description 填充色的不透明度，默认值为 1；
   */
  fillOpacity: number;
  /**
   * @description  描边色的不透明度，默认值为 1；
   */
  strokeOpacity: number;
  /**
   * @description 阴影的颜色；
   */
  shadowColor: string;
  /**
   * @description 阴影的模糊级别；
   */
  shadowBlur: number;
  /**
   * @description 阴影距形状的水平距离；
   */
  shadowOffsetX: number;
  /**
   * @description 阴影距形状的垂直距离；
   */
  shadowOffsetY: number;
  /**
   * @description 新图像如何绘制到已有的图像上
   */
  globalCompositeOperation: string;
}
export type NodeStyleLabel = Partial<
  {
    /**
     * @description  标签名称，\n 可换行
     * @description.en-US label name
     */
    value: string;
    /** 展示位置  'top' | 'bottom' | 'left' | 'right' | 'center' | */
    position: 'top' | 'bottom' | 'left' | 'right' | 'center' | string;
    /** 文本填充色 */
    fill: string;
    /** 文本大小 */
    fontSize: number;
    /** 文本在各自方向上的偏移量，主要为了便于调整文本位置,[offsetX,offsetY] */
    offset: number | number[];
    /**
     * @description 是否显示和隐藏
     * @default true
     */
    visible: boolean;
  } & CommondAttrsStyle
>;

export type NodeStyleIcon = Partial<
  {
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 'font' | 'image' | 'text' */
    type: 'font' | 'image' | 'text';
    /** 根据类型，填写对应的值 */
    value: string;
    /** 图标大小 */
    size: number | number[];
    /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
    fill: string;
    /** 裁剪图片 */
    clip: {
      r?: number;
      [key: string]: any;
    };
    fontFamily: string;
    /**
     * @description 是否显示和隐藏
     * @default true
     */
    visible: boolean;
  } & CommondAttrsStyle
>;

export type NodeStyleBadge = Partial<
  {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'LT' | 'RT' | 'RB' | 'LB' | string;
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'font' | 'image' | 'text' | string;
    value: number | string;
    // type = image 时生效，表示图片的宽度和高度
    size: number | number[];
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
    offset: number | number[];
    /**
     * @description 是否显示和隐藏
     * @default true
     */
    visible: boolean;
    /* 唯一身份 */
    id: string;
  } & CommondAttrsStyle
>;
export type NodeStyleKeyShape = Partial<
  {
    /** 节点的大小 */
    size: number;
    /** 填充色 */
    fill: string;
    /** 包围边颜色 */
    stroke: string;
    /** 边框的宽度 */
    lineWidth: number;
    /**
     * @description 是否显示和隐藏
     * @default true
     */
    visible: boolean;
  } & CommondAttrsStyle
>;

export type NodeStyleHalo = Partial<
  {
    /** 大小 */
    size: number | number[];
    /** 填充色 */
    fill: string;
    /** 包围边颜色 */
    stroke: string;
    /** 边框的宽度 */
    lineWidth: number;
    /** 透明度 */
    opacity: number;
    /**
     * @description 是否显示和隐藏
     * @default false
     */
    visible: boolean;
  } & CommondAttrsStyle
>;

export interface NodeShapeStyle {
  /** 节点的主要容器 */
  keyshape: NodeStyleKeyShape;
  /** 节点的文本 */
  label: NodeStyleLabel;
  /** 节点的中间位置图标区域 */
  icon: NodeStyleIcon;
  /** 节点的徽标 */
  badges: NodeStyleBadge[];
  /** 光环 */
  halo: NodeStyleHalo;
}

export enum StatusEnum {
  /** 悬停状态 */
  HOVER = 'hover',
  SELECTED = 'selected',
  NORMAL = 'normal',
  DISABLED = 'disabled',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface NodeStyle extends NodeShapeStyle {
  /** 状态样式 */
  status?: {
    [key in StatusEnum]?: Partial<NodeShapeStyle>;
  };
  [key: string]: any;
}

export interface ComboStyle {
  status?: any;
  [key: string]: any;
}

export interface Layout {
  /** 布局名称，必选 */
  type?: string;
  preset?: Layout;
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

export interface PlainObject {
  [key: string]: any;
}
