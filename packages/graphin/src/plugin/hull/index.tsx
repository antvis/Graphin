import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { HullOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type HullProps = {
  options?: HullOptions;
};

register('widget', 'hull', Extensions.Hull);

const PLUGIN_KEY = 'graphin-hull';

const Hull: React.FC<HullProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;

    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'hull',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default Hull;
