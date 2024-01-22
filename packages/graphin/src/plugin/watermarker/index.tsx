import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { WaterMarkerOptions } from '@antv/g6';
import React, { useEffect } from 'react';
import { useGraphin } from '../../context';

export type WaterMarkerProps = {
  options?: WaterMarkerOptions;
};

register('widget', 'waterMarker', Extensions.WaterMarker);

const PLUGIN_KEY = 'graphin-water-marker';

const WaterMarker: React.FC<WaterMarkerProps> = props => {
  const { graph } = useGraphin();

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'waterMarker',
        position: 'bottom',
        mode: 'image',
        begin: [10, 10],
        separation: [10, 10],
        ...props.options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default WaterMarker;
