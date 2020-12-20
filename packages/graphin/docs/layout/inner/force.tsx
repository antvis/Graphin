import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();
const handleTick = e => {
  console.log(e);
};
const layout = {
  type: 'force',
  preventOverlap: true,
  onTick: handleTick,
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
