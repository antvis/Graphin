import ForceLayout, { ForceProps } from '../force/ForceLayout';
import { optimizeDrawing, optimizeDrawingByNode } from '../../perf/optimizeDrawing';

import { LayoutOptionBase, Data, Node as NodeType, ForceSimulation } from '../../types';

import forceWithWorker from './forceWithWorker';
import { isBoolean } from 'lodash';

export interface ForceLayoutOptions extends ForceProps, LayoutOptionBase {
  isOptimization?: boolean;
}
interface Return {
  data: Data;
  simulation: ForceSimulation;
}

const forceLayout = (data: Data, options: ForceLayoutOptions): Return => {
  const {
    width,
    height,
    graph,
    enableWorker = false,
    animation,
    // eslint-disable-next-line
    done = (_graph: any) => {},
    isOptimization,
    ...others
  } = options;

  const animationCfg = isBoolean(animation) ? animation : true;

  /** Webworker solution. Otherwise, browser UI rendering is blocked */
  if (enableWorker && data.nodes.length > 100) {
    // 100以下的节点不走webworker
    return forceWithWorker(data, options);
  }

  /** 1. Create a force simulator */
  const simulation = new ForceLayout({
    width,
    height,
    animation: animationCfg,
    done: () => {
      if (isOptimization) {
        optimizeDrawing(graph, false);
      }
      done(graph);
    },
    ...others,
  });

  // 2. Mount Data
  simulation.setData(data);

  let resultData = data;

  // 3. Custom rendering function
  simulation.register('render', (forceData: Data) => {
    if (!animationCfg) {
      // 如果不需要动画
      resultData = forceData;
      return;
    }
    try {
      forceData.nodes.forEach((item: NodeType) => {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  /**  4. Start force  simulator */
  simulation.start();

  return {
    data: resultData,
    simulation,
  };
};
export default forceLayout;
