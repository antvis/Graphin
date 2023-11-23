import React from 'react';
import Graphin, { Behaviors, GraphinData } from '@antv/graphin';
import { Row, Col, Card } from 'antd';
import iconLoader from '@antv/graphin-icons';

const icons = Graphin.registerFontFamily(iconLoader);
const Color = {
  user: '#FF6A00',
  company: '#46a7a6',
};
const data: GraphinData = {
  nodes: [
    {
      id: 'node-0',
      x: 100,
      y: 100,
      data: {
        type: 'user',
      },
    },
    {
      id: 'node-1',
      x: 200,
      y: 200,
      data: {
        type: 'company',
        count: 300,
      },
    },
    {
      id: 'node-2',
      x: 100,
      y: 300,
      data: {
        type: 'company',
        count: 200,
      },
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
    {
      source: 'node-0',
      target: 'node-2',
      style: {
        keyshape: {
          lineDash: [2, 2],
          stroke: Color.user,
        },
        label: {
          value: '实际控制人',
          fill: Color.user,
        },
      },
    },
  ],
};

data.nodes.forEach(node => {
  const { id } = node;
  const { type, count } = node.data;
  node.style = {
    label: {
      value: id,
    },
    keyshape: {
      size: count ? (count / 10) * 2 : 30,
      stroke: Color[type],
      fill: Color[type],
      fillOpacity: 0.2,
      strokeOpacity: 1,
    },
    icon: {
      type: 'font',
      value: icons[type],
      /** 图标大小 */
      size: count ? count / 10 : 15,
      fill: Color[type],
      fontFamily: 'graphin',
    },
  };
});

const { ZoomCanvas } = Behaviors;
export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="关系数据" bodyStyle={{ height: '554px', overflow: 'scroll' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="可视化结果">
            <Graphin data={data} layout={{ type: 'preset' }}>
              <ZoomCanvas disabled />
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
