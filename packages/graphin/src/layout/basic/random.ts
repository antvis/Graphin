import { LayoutOptionBase, Data } from '../../types';

export interface RandomLayoutOptions extends LayoutOptionBase {
  /** 随机区域的bbox */
  bbox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

const randomLayout = (data: Data, cfg: RandomLayoutOptions) => {
  const defaultBbox = {
    x: 0,
    y: 0,
    w: 500,
    h: 500,
  };
  const { bbox } = cfg;
  const { x, y, w, h } = { ...defaultBbox, ...bbox };

  const { edges, nodes } = data;

  const newNodes = nodes.map(node => {
    return {
      ...node,
      x: x + Math.round(Math.random() * w),
      y: y + Math.round(Math.random() * h),
    };
  });

  return {
    nodes: newNodes,
    edges,
  };
};

export default randomLayout;
