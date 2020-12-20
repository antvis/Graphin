import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const layout = {
  type: 'concentric',
  maxLevelDiff: 0.5,
  sortBy: 'degree',
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} />
    </div>
  );
};
