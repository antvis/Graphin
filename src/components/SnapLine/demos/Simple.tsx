import Graphin, { Components, Utils } from '@antv/graphin';
import React from 'react';

const { SnapLine } = Components;

const options = {
  line: {
    stroke: 'lightgreen',
    lineWidth: 0.5,
  },
};
const Demo = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <SnapLine options={options} visible />
      </Graphin>
    </div>
  );
};
export default Demo;
