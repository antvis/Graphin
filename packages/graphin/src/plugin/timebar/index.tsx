import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { TimebarOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type TimebarProps = {
  options?: TimebarOptions;
};

register('widget', 'timebar', Extensions.Timebar);

const PLUGIN_KEY = 'graphin-timebar';

const Timebar: React.FC<TimebarProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'timebar',
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default Timebar;
