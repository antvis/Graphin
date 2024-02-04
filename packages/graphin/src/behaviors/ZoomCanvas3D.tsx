import * as React from 'react';
// @ts-expect-error
import type { ZoomCanvas3DOptions } from '@antv/g6';
import useBehavior from '../hooks/useBehavior';

const defaultConfig = {};

const ZoomCanvas3D: React.FC<ZoomCanvas3DOptions> = props => {
  useBehavior({
    type: 'zoom-canvas-3d',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default ZoomCanvas3D;
