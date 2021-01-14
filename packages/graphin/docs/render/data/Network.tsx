import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;
const data = Utils.mock(4)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
  minNodeSpacing: 50,
};
data;
console.log('network', data);

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled />
      </Graphin>
    </div>
  );
};
