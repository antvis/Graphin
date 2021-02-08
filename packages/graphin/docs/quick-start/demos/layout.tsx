import React from 'react';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import { Row, Col, Card } from 'antd';

const { ZoomCanvas, FitView } = Behaviors;
const data1 = Utils.mock(8).circle().graphin();
const data2 = Utils.mock(8).tree().graphin();

export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="同心圆布局算法：Concentric" bodyStyle={{ height: '554px', overflow: 'scroll' }}>
            <Graphin data={data1} layout={{ type: 'concentric' }}>
              <ZoomCanvas disabled />
            </Graphin>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="有向分层算法：Dagre">
            <Graphin data={data2} layout={{ type: 'dagre' }}>
              <ZoomCanvas disabled />
              {/** 树图的FitView 有BUG，网图的可以 */}
              <FitView />
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
