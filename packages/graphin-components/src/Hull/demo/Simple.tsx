import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import Hull, { HullCfg } from '../index';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';

const Demo = () => {
  const hullOptions: HullCfg[] = [
    {
      members: ['node-1', 'node-2'], // 必须参数
    },
    {
      members: ['node-4', 'node-5'],
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
