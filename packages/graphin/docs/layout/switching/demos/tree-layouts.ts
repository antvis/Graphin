export interface Option {
  key: string;
  title: string;
  defaultValue: number | string | boolean;
  component: 'switch' | 'slider' | 'input' | 'select' | 'text';
  description?: string;

  /** 仅 select 时候有效，枚举值 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enums?: any[];

  /** 仅 slider 和input 的时候有效 */
  max?: number;
  min?: number;
  step?: number;
}
export type Layouts = {
  type: string;
  title: string;
  options?: Option[];
}[];
const layouts: Layouts = [
  {
    type: 'dendrogram',
    options: undefined,
    title: '生态树布局',
  },
  {
    type: 'compactBox',
    title: '紧凑树布局',
    options: undefined,
  },
  // {
  //   type: 'indented',
  //   title: '缩进树布局',
  //   options: undefined,
  // },
  {
    type: 'mindmap',
    title: '脑图树布局',
    options: undefined,
  },
];
export default layouts;
