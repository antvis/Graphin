import type { Graph, GraphinProps } from '@antv/graphin';

export type WidgetItem = {
  /**
   * @description: widget name
   */
  name: string;
  /**
   * @description: 放入插槽
   */
  solt: 'sider' | 'panel' | 'canvas';
  /**
   * @description: 顺序，越小越靠前
   */
  order?: number;
  /**
   * @description: 其属性
   */
  properties?: Record<string, unknown>;
};

type InteractionType = 'selected' | 'hover' | 'active' | 'inactive' | 'disabled';

export type NodeState = {
  type: InteractionType;
  id: string;
  model?: any;
};

export type EdgeState = NodeState;

export type ComboState = NodeState;

// 图应用的描述
export type Application = {
  /**
   * @description 应用版本
   */
  version?: string;

  spec: {
    /**
     * @description graphin
     */
    graph: GraphinProps;
    /**
     * @description widgets
     */
    widgets: WidgetItem[];
  };
};

export interface IModel {
  /**
   * @description 画布实例
   */
  graph: (typeof Graph)[];
  /**
   * @description 是否初始化完成
   */
  isReady?: boolean;
  /**
   * @description 面板
   */
  panel?: {
    open: boolean;
  };
  /**
   * @description 侧边栏
   */
  sider?: {
    open: boolean;
  };
  /**
   * @description 交互状态
   */
  interaction?: {
    nodes?: readonly NodeState[];
    egdes?: readonly EdgeState[];
    combo?: readonly ComboState[];
  };
  application?: Application;
  /**
   * @description 获取 model
   */
  get: (name: string) => any;
}
