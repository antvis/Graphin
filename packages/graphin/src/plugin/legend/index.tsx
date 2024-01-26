import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { LegendOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type LegendProps = {
  options?: LegendOptions;
};

register('widget', 'legend', Extensions.Legend);

const PLUGIN_KEY = 'graphin-legend';

const Legend: React.FC<LegendProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'legend',
        size: 'fit-content',
        orientation: 'horizontal',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default Legend;
