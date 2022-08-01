import type { LegendChildrenProps, LegendOptionType } from '@antv/graphin';
import Graphin, { Components, Utils } from '@antv/graphin';
import iconsLoader from '@antv/graphin-icons';
import * as React from 'react';

const { Legend } = Components;

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
  const onChange = (checkedValue: LegendOptionType, options: LegendOptionType[]) => {
    console.log(checkedValue, options);
  };

  return (
    <Graphin data={data}>
      <Legend bindType="node" sortKey="data.type">
        {(renderProps: LegendChildrenProps) => {
          console.log('renderProps', renderProps);
          return <Legend.Node {...renderProps} onChange={onChange} />;
        }}
      </Legend>
    </Graphin>
  );
};

export default Demo;
