import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import iconsLoader from '@antv/graphin-icons';
import { Legend } from '@antv/graphin-components';

const icons = Graphin.registerFontFamily(iconsLoader);

const data = Utils.mock(5).circle().graphin();

const Color = {
  company: {
    primaryColor: '#ffc107',
    secondaryColor: Utils.hexToRgba('#ffc107', '0.2'),
  },
  person: {
    primaryColor: '#28a52d',
    secondaryColor: Utils.hexToRgba('#28a52d', '0.2'),
  },
};
data.nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;
  node.data.type = isCompany ? 'company' : 'person';
  const iconType = node.data.type;
  node.type = 'graphin-circle';

  node.style = {
    keyshape: {
      stroke: Color[iconType].primaryColor,
      size: [30],
      fill: Color[iconType].secondaryColor,
    },
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: isCompany ? icons.company : icons.user,
      size: 14,
      fill: Color[iconType].primaryColor,
    },
    status: {
      active: {
        halo: {
          visible: false,
        },
        keyshape: {
          lineWidth: 8,
        },
      },
      inactive: {
        halo: {
          visible: false,
        },
        keyshape: {
          fill: '#eee',
          stroke: '#eee',
        },
        icon: {
          fill: '#eee',
        },
      },
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
