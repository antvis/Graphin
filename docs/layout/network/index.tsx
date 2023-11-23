import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import { Row, Col, Card } from 'antd';

const { ZoomCanvas } = Behaviors;
const data = Utils.mock(8).tree().graphin();

const layouts = [
  {
    type: 'graphin-force',
    options: {},
    title: '渐进力导',
  },
  {
    type: 'preset',
    options: {},
    title: '预设布局',
  },
  {
    type: 'concentric',
    options: {},
    title: '同心圆布局',
  },
  {
    type: 'radial',
    options: {},
    title: '辐射布局',
  },
  {
    type: 'dagre',
    options: {},
    title: '层次布局',
  },
  {
    type: 'circular',
    options: {},
    title: '环形布局',
  },
  {
    type: 'force',
    options: {},
    title: 'D3力导',
  },
  {
    type: 'gForce',
    options: {},
    title: 'G6力导',
  },
  {
    type: 'mds',
    options: {},
    title: '降纬布局',
  },
  {
    type: 'random',
    options: {},
    title: '随机布局',
  },
];

export default () => {
  return (
    <div>
      <Row gutter={[12, 12]}>
        {layouts.map(item => {
          const { type, options, title } = item;
          const desc = <code>{`type:${type}`}</code>;
          return (
            <Col span={12} key={type}>
              <Card title={title} extra={desc}>
                <Graphin data={data} layout={{ type, ...options }}>
                  <ZoomCanvas disabled />
                </Graphin>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
