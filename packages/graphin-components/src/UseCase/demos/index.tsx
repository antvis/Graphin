import React from 'react';
import Graphin from '@antv/graphin';
import mockData from './mockData.json';

const Demo = () => {
  const GraphData = mockData;
  return (
    <div className="App">
      <Graphin
        data={GraphData}
        layout={{
          type: 'comboForce',
          nodeSpacing: (d) => 120,
          preventOverlap: true,
          collideStrength: 1,
          comboSpacing: 160,
          comboGravity: 120,
        }}
      />
    </div>
  );
};
export default Demo;
