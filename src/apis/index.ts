import { Graph } from '@antv/g6';
// import { handleAutoZoom, handleRealZoom, handleChangeZoom, handleZoomIn, handleZoomOut } from './zoom';
// import { focusNodeById, highlightNodeById } from './element';
import * as zoomApis from './zoom';
import * as elementApis from './element';

import { ApisType } from './types';

const apis = {
  ...zoomApis,
  ...elementApis,
};

const ApiController = (graph: Graph) => {
  const apiKeys = Object.keys(apis);
  return apiKeys.reduce((acc, curr) => {
    return {
      ...acc,
      // @ts-ignore
      [curr]: apis[curr](graph),
    };
  }, {}) as ApisType;
};

export default ApiController;
