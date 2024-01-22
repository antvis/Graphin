import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { SnaplineOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type SnaplineProps = {
  options?: SnaplineOptions;
};

register('widget', 'snapline', Extensions.Snapline);

const PLUGIN_KEY = 'graphin-snapline';

const Snapline: React.FC<SnaplineProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'snapline',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default Snapline;
