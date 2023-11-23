import React, { useEffect, useRef } from 'react';
import { useGraphin } from '../../useGraphin';
export interface MiniMapProps {}

const MiniMap: React.FunctionComponent<MiniMapProps> = props => {
  const { graph } = useGraphin();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    graph.addPlugins([
      {
        key: 'graphin-minimap',
        type: 'minimap',
        mode: 'delegate',
        container: containerRef.current,
      },
    ]);
    return () => {
      graph && graph.removePlugins(['graphin-minimap']);
    };
  }, [graph]);
  return <div ref={containerRef}></div>;
};

export default MiniMap;
