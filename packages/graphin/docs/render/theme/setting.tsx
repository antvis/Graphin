import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
import { Row, Col } from 'antd';

const { ZoomCanvas } = Behaviors;
const data = Utils.mock(4)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

const icons = Graphin.registerFontFamily(iconLoader);

data.nodes.forEach(node => {
  node.style = {
    ...node.style,
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: icons.user,
    },
  };
});

data.nodes[0].status = {
  selected: true,
};

export default () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Graphin data={data} layout={layout} theme={{ mode: 'light', primaryColor: '#D77622' }}>
            <ZoomCanvas disabled />
          </Graphin>
        </Col>
        <Col span={12}>
          <Graphin data={data} layout={layout} theme={{ mode: 'dark' }}>
            <ZoomCanvas disabled />
          </Graphin>
        </Col>
      </Row>
    </div>
  );
};
