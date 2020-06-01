import { optimizeDrawing } from '../perf/optimizeDrawing';
import Graphin from '../Graphin';
import { G6Event } from '../types';

interface ExtendedG6Event extends G6Event {
  action: string;
}

const changeZoom = (graphin: Graphin) => {
  const { graph, g6Options } = graphin;
  // const { forceSimulation } = state;

  const {
    isZoomOptimize = () => {
      return false;
    },
    keyShapeZoom = 0.6,
  } = g6Options!;

  /** 缩放的时候隐藏IMAGE/TEXT */
  let timer: null | number = null;
  graph!.on('viewportchange', (evt: ExtendedG6Event) => {
    if (evt.action === 'zoom' && isZoomOptimize(graph, evt)) {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        try {
          if (graphin.state.forceSimulation) {
            /** 如果存在力导，那么缩放结束且力导未结束前，只展示keyShape */
            if (graphin.state.forceSimulation.done) optimizeDrawing(graph, false);
          }
          /** 只有缩放比率大于keyShapeZoom，才展示所有的，否则只展示keyshape */
          if (graph!.getZoom() > keyShapeZoom) {
            optimizeDrawing(graph, false);
          }
        } catch (error) {
          optimizeDrawing(graph, false);
        }
      }, 200);
      optimizeDrawing(graph, true);
    }
  });
};
export default changeZoom;
