import type { HullCfg } from '@antv/graphin';
import Graphin, { Components, Utils } from '@antv/graphin';
import React from 'react';

const { Hull } = Components;

const Demo = () => {
  const hullOptions: HullCfg[] = [
    {
      members: ['node-1', 'node-2', 'node-9'], // 必须参数
    },
    {
      members: ['node-3', 'node-4'],
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    },
  ];

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Hull options={hullOptions} />
      </Graphin>
    </div>
  );
};
export default Demo;
