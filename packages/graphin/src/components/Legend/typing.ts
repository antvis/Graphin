/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LegendProps {
  /** 绑定的类型 */
  bindType: 'node' | 'edge';
  /**
   * @description 分类映射的Key值
   */
  sortKey: string;
  /**
   * @description  颜色映射的Key值
   * @default "style.stroke"
   */
  colorKey?: string;
  /**
   * @description 样式
   */
  style?: React.CSSProperties;

  children: (props: LegendChildrenProps) => React.ReactNode;
}
export interface OptionType {
  /** 颜色 */
  color: string;
  /** 值 */
  value: string | number;
  /** 标签 */
  label: string;
  /** 是否选中 */
  checked: boolean;
}

export interface LegendChildrenProps {
  bindType: string;
  sortKey: string;
  dataMap: Map<string | number, any>;
  options: OptionType[];
}
