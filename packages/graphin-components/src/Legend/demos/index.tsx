import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import iconsLoader from '@antv/graphin-icons';
import { Legend } from '@antv/graphin-components';

const icons = Graphin.registerFontFamily(iconsLoader);

const data = Utils.mock(5).circle().graphin();
data.nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;
  node.data.type = isCompany ? 'company' : 'person';
  node.type = 'graphin-circle';
  node.style = {
    keyshape: {
      fill: isCompany ? 'green' : 'yellow',
      size: [30],
    },
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: isCompany ? icons.company : icons.user,
      size: 14,
      fill: '#fff',
    },
  };
});

const Demo = () => {
  return (
    <Graphin data={data}>
      <Legend bindType="node" sortKey="data.type" colorKey="style.keyshape.fill">
        <Legend.Node />
      </Legend>
    </Graphin>
  );
};

export default Demo;
