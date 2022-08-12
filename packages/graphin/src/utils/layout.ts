import { IGraph } from '@antv/g6';
import { Layout, IUserNode } from '../typings/type';

const LAYOUT_CFG_KEY_MAP: { [key: string]: string } = {
  animation: 'animate',
  minDistanceThreshold: 'minMovement',
  maxIterations: 'maxIterations',
};

export const processLayoutConfig = (layoutCfg: Layout | undefined, graph: IGraph) => {
  if (!layoutCfg) return layoutCfg;
  const newLayoutCfg: Layout = {};
  Object.keys(layoutCfg).forEach(key => {
    if (key === 'preset' && layoutCfg.preset?.type) {
      newLayoutCfg.preset = processLayoutConfig(layoutCfg.preset, graph);
      return;
    }
    const newKey = LAYOUT_CFG_KEY_MAP[key];
    if (newKey) {
      newLayoutCfg[newKey] = layoutCfg[key];
    } else {
      newLayoutCfg[key] = layoutCfg[key];
    }
  });
  if (layoutCfg.done) {
    // 兼容成 graphin 原先 done 的格式
    if (!layoutCfg.onLayoutEnd) {
      newLayoutCfg.onLayoutEnd = (positions: IUserNode[]) => {
        layoutCfg.done(graph, positions);
      };
    } else {
      newLayoutCfg.onLayoutEnd = (positions: IUserNode[]) => {
        layoutCfg.onLayoutEnd(graph, positions);
        layoutCfg.done(graph, positions);
      };
    }
  }
  return newLayoutCfg;
};
