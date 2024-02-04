import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { FisheyeOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type FisheyeProps = {
  options?: FisheyeOptions;
};

register('widget', 'fisheye', Extensions.Fisheye);

const PLUGIN_KEY = 'graphin-fisheye';

const Fisheye: React.FC<FisheyeProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'fisheye',
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

export default Fisheye;
