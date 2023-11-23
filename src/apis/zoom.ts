import { IGraph } from '@antv/g6';

const zoomSensitivity = 10;
// 放大
export const handleZoomOut = (graph: IGraph) => () => {
  const zoomRatio = 100 / (100 + zoomSensitivity);
  if (zoomRatio !== 1) {
    graph.zoom(zoomRatio);
  }
};

// 缩小
export const handleZoomIn = (graph: IGraph) => () => {
  const zoomRatio = (100 + zoomSensitivity) / 100;
  if (zoomRatio !== 1) {
    graph.zoom(zoomRatio);
  }
};

// 实际大小
export const handleRealZoom = (graph: IGraph) => () => {
  graph.zoomTo(1);
};

// 自适应canvas大小
export const handleAutoZoom = (graph: IGraph) => () => {
  graph.fitView();
};
