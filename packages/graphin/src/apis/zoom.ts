import { Graph } from '@antv/g6';

// 放大
export const handleZoomOut = (graph: Graph) => () => {
  if (!graph || graph.destroyed) return;
  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 + 0.05 * 5;
  if (ratio * current > 5) {
    return;
  }
  graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
  return {
    text: `${Math.round(ratio * current * 100)}%`,
    ratio: ratio * current,
  };
};

// 缩小
export const handleZoomIn = (graph: Graph) => () => {
  if (!graph || graph.destroyed) return;

  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 - 0.05 * 5;
  if (ratio * current < 0.3) {
    return;
  }
  graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });

  return {
    text: `${Math.round(ratio * current * 100)}%`,
    ratio: ratio * current,
  };
};
// 自定义缩放
export const handleChangeZoom = (graph: Graph) => ({ text, ratio }: { text: string; ratio: number }) => {
  if (!graph || graph.destroyed) return;

  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
  const pixelRatio = canvas.get('pixelRatio') || 1;
  graph.zoomTo(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
  return {
    text,
    ratio,
  };
};

// 实际大小
export const handleRealZoom = (graph: Graph) => () => {
  if (!graph || graph.destroyed) return;
  const current = graph.getZoom();
  graph.zoom(1 / current);
  graph.fitCenter();
  return {
    text: '100%',
    ratio: 1,
  };
};

// 自适应canvas大小
export const handleAutoZoom = (graph: Graph) => () => {
  if (!graph || graph.destroyed) return;
  const nodes = graph.getNodes();
  if (nodes.length > 0) {
    graph.fitView([20, 20]);
  }
  const current = graph.getZoom();
  return {
    text: `${Math.round(current * 100)}%`,
    ratio: current,
  };
};
