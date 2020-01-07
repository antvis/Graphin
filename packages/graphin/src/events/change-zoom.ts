import { optimizeDrawing } from '../perf/optimizeDrawing';
import Graphin from '../Graphin';
import { ExtendedGraph, G6Event } from '../types';

interface ExtendedG6Event extends G6Event {
  action: string;
}

const changeZoom = (graphin: Graphin) => {
  const { graph, state, g6Options } = graphin;
  const { forceSimulation } = state;

  const {
    isZoomOptimize = () => {
      return false;
    },
    keyShapeZoom = 0.6,
  } = g6Options!;

  const extendedGraph = graph as ExtendedGraph;

  /** 缩放的时候隐藏IMAGE/TEXT */
  let timer: NodeJS.Timeout | null = null;
  graph!.on('viewportchange', (evt: ExtendedG6Event) => {
    if (evt.action === 'zoom' && isZoomOptimize(graph, evt)) {
      if (timer) window.clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          if (graphin.state.forceSimulation) {
            /** 如果存在力导，那么缩放结束且力导未结束前，只展示keyShape */
            if (graphin.state.forceSimulation.done) optimizeDrawing(extendedGraph, false);
          }
          /** 只有缩放比率大于keyShapeZoom，才展示所有的，否则只展示keyshape */
          if (graph!.getZoom() > keyShapeZoom) {
            optimizeDrawing(extendedGraph, false);
          }
        } catch (error) {
          optimizeDrawing(extendedGraph, false);
        }
      }, 200);
      optimizeDrawing(extendedGraph, true);
    }
  });
};
export default changeZoom;
