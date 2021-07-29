import Graphin, { Utils } from '@antv/graphin';
import React from 'react';
import Combo, { ComboCfg } from '../index';
// Do not forget to import CSS

const Demo = () => {
  const comboOptions: ComboCfg[] = [
    {
      members: ['node-1', 'node-2', 'node-9'], // 必须参数
    },
    {
      members: ['node-3', 'node-4'],
      type: 'circle',
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
        <Combo options={comboOptions} />
      </Graphin>
    </div>
  );
};
export default Demo;
