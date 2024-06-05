import React from 'react';
import { Minimap as GraphinMinimap } from '@antv/graphin';
import { useGraph } from '../../hooks';
import { PREFIX } from '../../constants';

export const Minimap: React.FC<any> = props => {
  const { graph } = useGraph();

  return (
    <div className={`${PREFIX}-minimap`}>
      <GraphinMinimap />
    </div>
  );
};
