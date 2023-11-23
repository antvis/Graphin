import React from 'react';
import Graphin, { Utils, Behaviors, GraphinData, IUserNode, Layout, ThemeType } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
import { Row, Col } from 'antd';

const { ZoomCanvas } = Behaviors;
const data: GraphinData = Utils.mock(4).circle().graphin();

const layout: Layout = {
  type: 'concentric',
};

const icons = Graphin.registerFontFamily(iconLoader);

data.nodes.forEach((node: IUserNode) => {
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

const lightTheme: Partial<ThemeType> = {
  mode: 'light',
  primaryColor: '#D77622',
};

const darkTheme: Partial<ThemeType> = {
  mode: 'dark',
};

export default (): JSX.Element => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Graphin data={data} layout={layout} theme={lightTheme}>
            <ZoomCanvas disabled />
          </Graphin>
        </Col>
        <Col span={12}>
          <Graphin data={data} layout={layout} theme={darkTheme}>
            <ZoomCanvas disabled />
          </Graphin>
        </Col>
      </Row>
    </div>
  );
};
