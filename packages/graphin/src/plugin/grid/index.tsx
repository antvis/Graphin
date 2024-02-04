import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { GridOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type GridProps = {
  options?: GridOptions;
};

register('widget', 'grid', Extensions.Grid);

const PLUGIN_KEY = 'graphin-grid';

const Grid: React.FC<GridProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'grid',
        scaleDBy: 'unset',
        scaleRBy: 'unset',
        r: 200,
        showLabel: true,
        trigger: 'mousemove',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default Grid;
