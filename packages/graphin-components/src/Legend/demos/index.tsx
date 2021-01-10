import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { Legend } from '@antv/graphin-components';

const data = Utils.mock(5).circle().graphin();
data.nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;
  node.data.type = isCompany ? 'company' : 'person';
  node.style = {
    fill: isCompany ? 'red' : '#f79e26',
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: isCompany ? 'company' : 'user',
    },
  };
});

const Demo = () => {
  return (
    <Graphin data={data}>
      <Legend bindType="node" sortKey="data.type" colorKey="style.fill">
        <Legend.Node />
      </Legend>
    </Graphin>
  );
};

export default Demo;
