import { LayoutOption } from '../../controller/layout/defaultLayouts';
import ForceLayout from '../force/ForceLayout';
import { optimizeDrawing, optimizeDrawingByNode } from '../../perf/optimizeDrawing';
import randomLayout, { RandomLayoutOptions } from './random';
import ConcentricLayout from './concentric';
import TweakLayout from './tweak';
import { LayoutOptionBase, Data, Node, ForceSimulation, ExtendedGraph, Graph } from '../../types';

export interface ForceLayoutOptions extends LayoutOptionBase {
  /** 前置布局 */
  preset?: {
    name: string;
    options: LayoutOption;
  };
  /** 是否开启动画 */
  animation?: boolean;
  done?: (graph: Graph) => void;
  isOptimization?: boolean;
  /** spring stiffness 弹簧劲度系数 * */
  stiffness: number;
  /** 默认的弹簧长度 * */
  defSpringLen: number;
  /** repulsion 斥力，这里指代 库伦常量Ke */
  repulsion: number;
  /** 速度的减震因子，其实就是阻尼系数 */
  damping: number;
  /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽 */
  minEnergyThreshold: number;
  /** 最大的速度 [0,1000] */
  maxSpeed: number;
  /** 最大迭代数 */
  MaxIterations: number; // 240, // 1000000次/(1000/60) = 60000s = 1min
}
interface Return {
  data: Data;
  simulation: ForceSimulation;
}

const forceLayout = (options: ForceLayoutOptions): Return => {
  const {
    width,
    height,
    graph,
    data,
    /** force options */
    preset = { name: '', options: {} },
    animation,
    done = () => {},
    isOptimization,
    ...others
  } = options;

  const concentricOptions = {
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
    levelWidth: (nodes: object, maxDegree: number) => {
      /** 同心圆层数 */
      const levelNum = 8;
      return maxDegree / levelNum;
    },
  };
  const randomOptions = {
    bbox: {
      x: 0,
      y: 0,
      w: width,
      h: height,
    },
  };

  let sourceData = data;

  if (preset.name === 'random') {
    sourceData = randomLayout(data, { ...randomOptions, ...preset.options } as RandomLayoutOptions) as Data;
  }
  if (preset.name === 'concentric') {
    sourceData = new ConcentricLayout({
      ...concentricOptions,
      ...preset.options,
      data,
    }).run();
  }
  if (preset.name === 'force') {
    sourceData = TweakLayout(data, options).data;
  }

  /** 创建力导模拟器 */
  const simulation = new ForceLayout({
    width,
    height,
    animation: animation !== undefined ? animation : true,
    done: () => {
      if (isOptimization) {
        optimizeDrawing(graph as ExtendedGraph, false);
      }
      done(graph);
    },
    ...others,
  });

  // 1. 挂载数据
  simulation.setData(sourceData);

  // 3.启动
  // 4. 自定义渲染函数
  simulation.register('render', (forceData: Data) => {
    try {
      forceData.nodes.forEach((item: Node) => {
        const node = graph.findById(item.id);
        if (node) {
          // 因为有可能画布删除了节点
          const model = node.get('model');
          model.x = item.x;
          model.y = item.y;
          if (isOptimization) {
            optimizeDrawingByNode(true, node);
          }
        }
      });
      graph.refreshPositions();
      sourceData = forceData;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });

  simulation.start();

  return {
    data: sourceData,
    simulation,
  };
};
export default forceLayout;
