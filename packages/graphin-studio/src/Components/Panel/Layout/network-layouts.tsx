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
    type: 'graphin-force',
    options: undefined,
    title: '渐进力导',
  },
  {
    type: 'force',
    title: 'D3力导',
    options: [
      {
        key: 'preventOverlap',
        title: '是否防止重叠',
        defaultValue: true,
        component: 'switch',
      },
      {
        key: 'linkDistance',
        title: '边的长度',
        defaultValue: 250,
        component: 'slider',
        min: 100,
        max: 500,
      },
      {
        key: 'nodeStrength',
        title: '节点作用力',
        defaultValue: 30,
        component: 'slider',
        min: 10,
        max: 100,
      },
      {
        key: 'edgeStrength',
        title: '边的作用力',
        defaultValue: 0.1,
        component: 'slider',
        min: 0,
        max: 1,
      },
      {
        key: 'collideStrength',
        title: '防止重叠的力强度',
        defaultValue: 0.8,
        component: 'slider',
        max: 1,
        min: 0,
      },
    ],
  },
  {
    type: 'concentric',
    title: '同心圆布局',
    options: [
      {
        component: 'slider',
        key: 'nodeSize',
        title: '节点大小',
        defaultValue: 50,
        description: '节点的大小（直径），用于防止节点重叠时的碰撞检测',
      },
      {
        component: 'slider',
        key: 'minNodeSpacing',
        title: '最小间距',
        defaultValue: 10,
        description: '环与环之间的最小间距，用于调整半径，默认值为10',
      },
      {
        component: 'switch',
        key: 'preventOverlap',
        title: '是否防止重叠',
        defaultValue: true,
        description:
          '是否防止重叠，设置为true后，可以避免节点之间相互重叠，必须配置nodeSize使用，只有当nodeSIze设置为和节点大小一致时，才会进行节点重叠的碰撞检测',
      },
      {
        component: 'slider',
        key: 'sweep',
        title: '弧度差',
        defaultValue: undefined,
        min: 0,
        max: 10,
        description: '第一个节点和最后一个节点之间的弧度差',
      },
      {
        component: 'switch',
        key: 'equidistant',
        title: '是否等间距',
        defaultValue: false,
        description: '环与环之间的距离是否相等，默认为false，设置为true，在视觉上比较统一',
      },
      {
        component: 'slider',
        key: 'startAngle',
        title: '起始弧度',
        defaultValue: (3 / 2) * Math.PI,
        min: 0,
        max: 2 * Math.PI,
        step: 0.1 * Math.PI,
        description: '节点的起始弧度值，默认为3 / 2 * Math.PI',
      },
      {
        component: 'switch',
        key: 'clockwise',
        title: '是否顺时针',
        defaultValue: false,
        description: '是否按照顺时针方向排列，默认为false',
      },
      {
        component: 'select',
        key: 'sortBy',
        title: '排序依据',
        defaultValue: 'degree',
        enums: [
          { key: 'degree', value: 'degree' },
          { key: 'topology', value: 'topology' },
        ],
        description: '指定排序的依据，即节点的某个属性名，数值越高则该节点被放置的越中心',
      },
    ],
  },
  {
    type: 'grid',
    options: [
      // {
      //   component: TwoInput,
      //   key: 'begin',
      //   title: '起始位置',
      //   inputLabel: ['x', 'y'],
      //   isPx: false,
      //   defaultValue: [50, 150],
      //   description: '网格左上角的位置，默认值为(0, 0)点',
      // },
      {
        component: 'slider',
        key: 'width',
        title: '布局宽度',
        defaultValue: 200,
        min: 10,
        max: 5000,
        description: '布局的宽度',
      },
      {
        component: 'slider',
        key: 'height',
        title: '布局高度',
        defaultValue: 200,
        min: 10,
        max: 5000,
        description: '布局的高度',
      },
      {
        component: 'switch',
        key: 'preventOverlap',
        title: '是否避免重叠',
        defaultValue: false,
        description:
          '是否防止节点重叠，开启后可以避免节点重叠在一起，必须配合nodeSize属性使用，只有设置了与图中节点大小相同的nodeSize值，才能够进行碰撞检测',
      },
      {
        component: 'slider',
        key: 'preventOverlapPadding',
        title: '节点间距',
        defaultValue: 10,
        min: 1,
        max: 100,
        description: '避免重叠时节点的间距值，当preventOverlap为true时生效',
      },
      {
        component: 'switch',
        key: 'condense',
        title: '是否压缩',
        defaultValue: false,
        description: '为true时利用最小画布空间，为false时利用所有可用画布大小',
      },
      {
        component: 'slider',
        key: 'rows',
        title: '网格行数',
        defaultValue: 10,
        min: 1,
        max: 500,
        description: '网格的行数，默认值为10',
      },
      {
        component: 'slider',
        key: 'cols',
        title: '网格列数',
        defaultValue: 10,
        min: 1,
        max: 500,
        description: '网格的列数，默认值为10',
      },
      {
        component: 'select',
        key: 'sortBy',
        title: '排序依据',
        defaultValue: null,
        enums: [
          { key: null, value: null },
          { key: 'topology', value: 'topology' },
          { key: 'degree', value: 'degree' },
        ],
        description:
          '指定排序的依据，即根据节点的哪个属性进行排序，数值越高则该节点被放置得越中心，如果不指定，则会计算节点的度数，度数越高，节点将被放置得越中心',
      },
    ],
    title: '网格布局',
  },
  {
    type: 'radial',
    options: undefined,
    title: '辐射布局',
  },
  {
    type: 'dagre',
    options: [
      {
        component: 'select',
        key: 'rankdir',
        title: '布局方向',
        defaultValue: 'TB',
        enums: [
          { key: 'TB', value: 'TB' },
          { key: 'BT', value: 'BT' },
          { key: 'LR', value: 'LR' },
          { key: 'RL', value: 'RL' },
        ],
        description:
          '布局的方向，默认值TB，即从上至下布局，TB表示从上至下布局，BT表示从下至上布局，LR表示从左至右布局，RL表示从右至左布局',
      },
      {
        component: 'select',
        key: 'align',
        title: '对齐方式',
        defaultValue: undefined,
        enums: [
          { key: null, value: null },
          { key: 'UL', value: 'UL' },
          { key: 'UR', value: 'UR' },
          { key: 'DL', value: 'DL' },
          { key: 'DR', value: 'DR' },
        ],
        description:
          '节点的对齐方式，默认为UL，即对齐到左上角，UL表示对齐到左上角，UR表示对齐到右下角，DL表示对齐到左下角，DR表示对齐到右下角',
      },
      {
        component: 'slider',
        key: 'nodeSize',
        title: '节点占布局空间',
        defaultValue: 0,
        max: 200,
        min: 0,
        description: '节点参与布局所占的空间大小。若设置为0，将使用节点本身的大小',
      },
      {
        component: 'slider',
        key: 'nodesep',
        title: '节点间距',
        defaultValue: 10,
        max: 200,
        min: 1,
        description: '节点的间距，rankdir为TB或BT时是水平间距，rankdir为LR或RL时为垂直方向上的间距',
      },
      {
        component: 'input',
        key: 'ranksep',
        title: '层间距',
        defaultValue: 10,
        max: 200,
        min: 1,
        description:
          '各层之间的间距，rankdir为TB或BT时是垂直方向相邻层之间的间距，rankdir为LR或RL时为水平方向上相邻层之间的间距',
      },
    ],
    title: '层次布局',
  },
  {
    type: 'circular',
    options: undefined,
    title: '环形布局',
  },
  // {
  //   type: 'gForce',
  //   options: undefined,
  //   title: 'G6力导',
  // },
  {
    type: 'mds',
    options: undefined,
    title: '降维布局',
  },
  {
    type: 'random',
    options: undefined,
    title: '随机布局',
  },
];
export default layouts;
