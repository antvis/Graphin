import * as React from 'react';
// @ts-expect-error
import type { OrbitCanvas3DOptions } from '@antv/g6';
import useBehavior from '../hooks/useBehavior';

const defaultConfig = {
  type: 'orbit-canvas-3d',
  trigger: 'drag',
};

const ZoomCanvas3D: React.FC<OrbitCanvas3DOptions> = props => {
  useBehavior({
    type: 'orbit-canvas-3d',
    userProps: props,
    defaultConfig,
  });
  return null;
};

export default ZoomCanvas3D;
