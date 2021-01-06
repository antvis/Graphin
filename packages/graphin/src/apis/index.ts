import { Graph } from '@antv/g6';
import { handleAutoZoom, handleRealZoom, handleChangeZoom, handleZoomIn, handleZoomOut } from './zoom';
import { focusNodeById, highlightNodeById } from './element';

const Api = (graph: Graph) => {
  const apis = {
    /**
     * @description 自动缩放
     */
    handleAutoZoom: handleAutoZoom(graph),
    /**
     * @description 缩放真实大小
     */
    handleRealZoom: handleRealZoom(graph),
    handleChangeZoom: handleChangeZoom(graph),
    handleZoomIn: handleZoomIn(graph),
    handleZoomOut: handleZoomOut(graph),

    focusNodeById: focusNodeById(graph),
    highlightNodeById: highlightNodeById(graph),
  };
  return apis;
};

type ApiType = typeof Api;
export default Api;
