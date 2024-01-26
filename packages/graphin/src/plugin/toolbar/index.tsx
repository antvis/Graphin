import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { ToolbarConfig } from '@antv/g6';
import React, { useEffect } from 'react';
import { PREFIX, Z_INDEX } from '../../constants';
import { useGraphin } from '../../context';

export type ToolbarProps = {
  options?: ToolbarConfig;
  style?: React.CSSProperties;
};

register('widget', 'toolbar', Extensions.Toolbar);

const PLUGIN_KEY = 'graphin-toolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  const { graph } = useGraphin();
  const { options, style } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'toolbar',
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
    top: 0,
    zIndex: Z_INDEX,
    ...style,
  };

  return <div className={`${PREFIX}-toolbar`} ref={containerRef} style={containerStyle}></div>;
};

export default Toolbar;
