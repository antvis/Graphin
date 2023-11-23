import * as React from 'react';
import useBehaviorHook from './useBehaviorHook';

const defaultConfig = {};

export type IDragCanvasProps = Partial<typeof defaultConfig>;

const ZoomCanvas3D: React.FunctionComponent<IDragCanvasProps> = props => {
  useBehaviorHook({
    type: 'zoom-canvas-3d',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default ZoomCanvas3D;
