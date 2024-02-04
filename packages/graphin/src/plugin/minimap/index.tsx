import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { MiniMapConfig } from '@antv/g6';
import React, { useEffect } from 'react';
import { PREFIX, Z_INDEX } from '../../constants';
import { useGraphin } from '../../context';

export type MinimapProps = { options?: MiniMapConfig; style?: React.CSSProperties };

register('widget', 'minimap', Extensions.Minimap);

const PLUGIN_KEY = 'graphin-minimap';

const Minimap: React.FC<MinimapProps> = props => {
  const { graph } = useGraphin();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { options, style } = props;
  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'minimap',
        mode: 'delegate',
        container: containerRef.current,
        ...options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  const containerStyle = {
    position: 'absolute' as const,
    right: 0,
    bottom: 0,
    zIndex: Z_INDEX,
    ...style,
  };

  return <div className={`${PREFIX}-minimap`} ref={containerRef} style={containerStyle}></div>;
};

export default Minimap;
