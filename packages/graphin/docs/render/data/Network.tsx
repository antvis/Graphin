import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;
const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'circular',
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled={true} />
      </Graphin>
    </div>
  );
};
