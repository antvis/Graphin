import { Pie } from '@ant-design/charts';
import React from 'react';

const DemoPie: React.FC = () => {
  const data = [
    {
      type: '男',
      value: 30,
    },
    {
      type: '女',
      value: 10,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        const { percent } = _ref;
        return ''.concat(percent * 100, '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return <Pie {...config} />;
};

export default DemoPie;
