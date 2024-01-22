import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { EdgeFilterLensOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type EdgeFilterLensProps = {
  options?: EdgeFilterLensOptions;
};

register('widget', 'EdgeFilterLens', Extensions.EdgeFilterLens);

const PLUGIN_KEY = 'graphin-edge-filter-lens';

const EdgeFilterLens: React.FC<EdgeFilterLensProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'filterLens',
        trigger: 'mousemove',
        showLabel: 'edge',
        r: 140,
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default EdgeFilterLens;
