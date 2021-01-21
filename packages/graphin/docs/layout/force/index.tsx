import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const layout = {
  type: 'force',
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
