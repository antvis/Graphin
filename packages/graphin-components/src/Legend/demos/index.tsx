import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import iconsLoader from '@antv/graphin-icons';
import { Legend } from '@antv/graphin-components';

const icons = Graphin.registerFontFamily(iconsLoader);

const data = Utils.mock(5).circle().graphin();

const Color = {
  company: {
    primaryColor: '#ffc107',
  },
  person: {
    primaryColor: '#28a52d',
  },
};
data.nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;
  const iconType = isCompany ? 'company' : 'person';
  node.data = {
    type: iconType,
  };
  node.type = 'graphin-circle';
  const { primaryColor } = Color[iconType];
  node.style = {
    keyshape: {
      size: 30,
      stroke: primaryColor,
      fill: primaryColor,
      fillOpacity: 0.2,
    },
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: isCompany ? icons.company : icons.user,
      size: 14,
      fill: primaryColor,
    },
  };
});

const Demo = () => {
  return (
    <Graphin data={data}>
      <Legend bindType="node" sortKey="data.type" colorKey="style.keyshape.stroke">
        <Legend.Node />
      </Legend>
    </Graphin>
  );
};

export default Demo;
