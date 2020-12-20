import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const layout = {
  type: 'circular',
  // center: [200, 200], // 可选，默认为图的中心
  radius: null, // 可选
  startRadius: 10, // 可选
  endRadius: 100, // 可选
  clockwise: false, // 可选
  divisions: 5, // 可选
  ordering: 'degree', // 可选
  angleRatio: 1, // 可选
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
