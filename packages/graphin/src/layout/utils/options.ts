export type Layouts = {
  type: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { [key: string]: any };
}[];
export const layouts: Layouts = [
  {
    type: 'graphin-force',
    options: {},
    title: '渐进力导',
  },
  {
    type: 'force',
    title: 'D3力导',
    options: {
      /** 是否防止重叠，必须配合下面属性 nodeSize 或节点数据中的 size 属性，只有在数据中设置了 size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测 */
      preventOverlap: true,

      /** 边长度：Number / Function */
      linkDistance: 250, // 可选，边长

      /** 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用 */
      nodeStrength: 30, // 可选

      /** 边的作用力，默认根据节点的出入度自适应 */
      edgeStrength: 0.1, // 可选

      /** 防止重叠的力强度，范围 [0, 1] */
      collideStrength: 0.8, // 可选

      /** 节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 size，则默认大小为 10 */
      nodeSize: 30, // 可选

      /** 可选:当前的迭代收敛阈值 */
      alpha: 0.3,

      /** 可选:迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300 */
      alphaDecay: 0.028,
      /** 可选: 停止迭代的阈值 */
      alphaMin: 0.01, //
      forceSimulation: null,
      /** 是否按照聚类信息布局 */
      clustering: false,
    },
  },
  {
    type: 'concentric',
    title: '同心圆布局',
    options: {
      minNodeSpacing: 60, // 可选，边长
      preventOverlap: true, // 可选，必须配合 nodeSize
      nodeSize: 60,
    },
  },
  {
    type: 'grid',
    options: {},
    title: '网格布局',
  },
  {
    type: 'radial',
    options: {},
    title: '辐射布局',
  },
  {
    type: 'dagre',
    title: '层次布局',
    options: {},
  },
  {
    type: 'circular',
    options: {},
    title: '环形布局',
  },

  {
    type: 'gForce',
    options: {
      linkDistance: () => 200,
      preventOverlap: true,
    },
    title: 'G6力导',
  },
  {
    type: 'mds',
    options: {},
    title: '降维布局',
  },
  {
    type: 'random',
    options: {},
    title: '随机布局',
  },
];

const options = layouts
  .map(c => {
    const { type, options } = c;
    return {
      type,
      ...options,
    };
  })
  .reduce((acc, curr) => {
    return {
      ...acc,
      [curr.type]: curr,
    };
  }, {});

export default options;
