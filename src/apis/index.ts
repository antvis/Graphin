import { IGraph } from '@antv/g6';
// import { handleAutoZoom, handleRealZoom, handleChangeZoom, handleZoomIn, handleZoomOut } from './zoom';
// import { focusNodeById, highlightNodeById } from './element';
import * as elementApis from './element';
import * as zoomApis from './zoom';

import { ApisType } from './types';

const apis = {
  ...zoomApis,
  ...elementApis,
};

const ApiController = (graph: IGraph) => {
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
