import { register, Extensions } from '@antv/g6';
// @ts-expect-error
import type { TooltipConfig } from '@antv/g6';
import React, { useEffect } from 'react';
import { PREFIX } from '../../constants';
import { useGraphin } from '../../context';

export type TooltipProps = { options?: TooltipConfig; style?: React.CSSProperties };

register('widget', 'tooltip', Extensions.Tooltip);

const PLUGIN_KEY = 'graphin-tooltip';

const Tooltip: React.FC<TooltipProps> = props => {
  const { graph } = useGraphin();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { options, style } = props;
  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        key: PLUGIN_KEY,
        type: 'tooltip',
        trigger: 'pointermove',
        container: containerRef.current,
        ...options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return <div className={`${PREFIX}-tooltip`} ref={containerRef} style={style}></div>;
};

export default Tooltip;
