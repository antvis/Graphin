import React from 'react';
import Graphin from '@antv/graphin';
import {
  AlgorithmAnalysisPanel,
  FilterPanel,
  ContextMenu,
  Tooltip,
  MiniMap,
  Legend,
  Hull,
  FishEye,
  EdgeBundling,
} from '@antv/graphin-components';

export default () => {
  return (
    <Graphin
      data={data}
      layout={{
        type: 'graphin-force',
      }}
    >
      <AlgorithmAnalysisPanel />
      <FilterPanel />
      <ContextMenu />
      <Tooltip />
      <MiniMap />
      <Legend />
      <Hull />
      <FishEye />
      <EdgeBundling />
    </Graphin>
  );
};
