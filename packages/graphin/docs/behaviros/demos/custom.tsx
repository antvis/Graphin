import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const data = Utils.mock(5).circle().graphin();
const layout = {
  type: 'concentric',
};

const { ZoomCanvas } = Behaviors;
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas enableOptimize />
      </Graphin>
    </div>
  );
};
