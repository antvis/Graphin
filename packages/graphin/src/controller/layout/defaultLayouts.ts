import circleLayout, { CircleLayoutOption } from '../../layout/basic/circle';
import radialLayout, { RadialLayoutOption } from '../../layout/g6/radial';
import ConcentricLayout, { ConcentricOption } from '../../layout/basic/concentric';
import forceLayout, { ForceLayoutOptions } from '../../layout/basic/force';
import dagreLayout, { DagreLayoutOption } from '../../layout/g6/dagre';
import gridLayout, { GridLayoutOptions } from '../../layout/basic/grid';
import randomLayout, { RandomLayoutOptions } from '../../layout/basic/random';
import TweakLayout from '../../layout/basic/tweak';
import Graphin from '../../Graphin';
import { Data, ForceSimulation, GraphinProps, LayoutOptionBase } from '../../types';

export type LayoutOption =
  | CircleLayoutOption
  | RadialLayoutOption
  | ConcentricOption
  | RandomLayoutOptions
  | ForceLayoutOptions
  | DagreLayoutOption
  | GridLayoutOptions
  | LayoutOptionBase;

const defaultLayouts = (graphin: Graphin, prevProps: GraphinProps) => {
  const { graph } = graphin;
  const width = graph!.get('width');
  const height = graph!.get('height');

  return [
    {
      name: 'random',
      desc: '随机布局',
      icon: 'random',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 随机区域的bbox */
          bbox: {
            x: 0,
            y: 0,
            w: width,
            h: height,
          },
        };

        return {
          data: randomLayout(data, { ...defaultOptions, ...options }) as Data,
        };
      },
    },

    {
      name: 'circle',
      desc: '圆形布局',
      icon: 'chrome',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 圆心 x坐标 */

          x: width / 2,
          /** 圆心 y坐标 */

          y: height / 2,
          /** 半径，默认半径为节点数*10 */
          r: data.nodes.length * 10,
        };
        return {
          data: circleLayout(data, { ...defaultOptions, ...options }) as Data,
        };
      },
    },
    {
      name: 'dagre',
      desc: '有向分层',
      icon: 'apartment',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 中心点坐标 */
          // WARNING: center is not working any more ?
          center: [0, 0],
          /** 节点大小 */
          nodeSize: [50, 50],
          /**  节点水平间距(px) */
          nodesep: 12,
          /** 每一层节点之间间距 */
          ranksep: 50,
          /** 放置位置 */
          align: 'UL',
        };
        return {
          data: dagreLayout(data, { ...defaultOptions, ...options } as DagreLayoutOption),
        };
      },
    },
    {
      name: 'radial',
      desc: '迳向布局',
      icon: 'trademark',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 中心点坐标 */
          center: [width / 2, height / 2],
          /** 防止覆盖 */
          preventOverlap: true,
          /** 节点大小 */
          nodeSize: 100,
          /** 每层的半径 */
          unitRadius: 150,
        };
        return {
          data: radialLayout(data, { ...defaultOptions, ...options } as RadialLayoutOption),
        };
      },
    },
    {
      name: 'grid',
      desc: '横纵布局',
      icon: 'appstore',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 布局范围的宽度 */
          width,
          /** 布局范围的高度 */
          height,
          /** 节点间的间距，上下左右均是一致的 */
          nodeSep: 100,
          /** 节点的大小，单位px */
          nodeSize: 50,
        };
        return {
          data: gridLayout(data, { ...defaultOptions, ...options } as GridLayoutOptions),
        };
      },
    },
    {
      name: 'concentric',
      desc: '同心圆布局',
      icon: 'chrome',
      layout: (data: Data, options: LayoutOption): { data: Data } => {
        const defaultOptions = {
          /** 同心圆的布局范围，默认为当前画布的宽高范围 */
          boundingBox: {
            x1: 0,
            y1: 0,
            w: width,
            h: height,
          },
          /** 节点间的距离，默认为60 */
          minNodeSpacing: 60,
          /** 每层的节点度数范围 */
          levelWidth: (nodes: Data['nodes'], maxDegree: number) => {
            /** 同心圆层数 */
            const levelNum = 8;
            return maxDegree / levelNum;
          },
        };
        return {
          data: new ConcentricLayout({
            ...defaultOptions,
            ...options,
            data,
          }).run(),
        };
      },
    },
    {
      name: 'force',
      desc: '力导布局',
      icon: 'branches',
      layout: (data: Data, options: LayoutOption): { data: Data; forceSimulation: ForceSimulation } => {
        const defaultOptions = {
          data,
          /** 前置布局，默认为 concentric */
          preset: {
            /** 特殊情况处理：前置布局为force，但是前置的数据也为空，则证明是初始化force布局，否则为正常前置force布局 */
            name: (prevProps.layout && prevProps.layout.name) || 'concentric',
            options: {},
          },
          /** spring stiffness 弹簧劲度系数 * */
          stiffness: 200.0,

          /** repulsion 斥力，这里指代 库伦常量Ke */
          repulsion: 200.0 * 5,
          /** 向心力 */
          centripetalOptions: {
            leaf: 1.6,
            single: 1.6,
          },
          /** 速度的减震因子，其实就是阻尼系数 */
          damping: 0.9,
          /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽 */
          minEnergyThreshold: 0.1,
          /** 最大的速度 [0,1000] */
          maxSpeed: 1000,
          /** 最大迭代数 */
          MaxIterations: 10000, // 240, // 1000000次/(1000/60) = 60000s = 1min
          /** 是否开启动画 */
          animation: true,
        };

        const layouOpts = { ...defaultOptions, ...options };
        let { name: presetName, options: presetOptions = {} } = layouOpts.preset;

        if (presetName === 'force' && data.nodes.length === 0) {
          presetName = 'concentric';
        }

        let presetData = data;
        // 处理 前置布局后的数据
        if (presetName === 'force') {
          presetData = TweakLayout(presetData, options as ForceLayoutOptions).data;
        } else {
          const layouts = defaultLayouts(graphin, prevProps);
          const presetLayout =
            layouts.find(item => {
              return item.name === presetName;
            }) || layouts[5]; // concentric
          presetData = presetLayout?.layout(data, presetOptions as ForceLayoutOptions).data as Data;
        }

        const force = forceLayout(presetData, layouOpts as ForceLayoutOptions);

        return {
          data: force.data,
          forceSimulation: force.simulation,
        };
      },
    },
  ];
};

export default defaultLayouts;
