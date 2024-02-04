import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { EdgeBundlingOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type EdgeBundlingProps = {
  options?: EdgeBundlingOptions;
};

register('edge', 'polyline-edge', Extensions.PolylineEdge);
register('widget', 'edgeBundling', Extensions.EdgeBundling);

const PLUGIN_KEY = 'graphin-edge-bundling';

const EdgeBundling: React.FC<EdgeBundlingProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'edgeBundling',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default EdgeBundling;
