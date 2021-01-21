import React from 'react';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import { Row, Col, Card } from 'antd';

const { ZoomCanvas, ActivateRelations, TreeCollapse } = Behaviors;
const data1 = Utils.mock(8)
  .circle()
  .graphin();

export default () => {
  const [state, setState] = React.useState({
    data2: null,
  });
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then(res => {
        console.log('data', res);
        setState({
          data2: res,
        });
      });
  }, []);
  const { data2 } = state;

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="网图的 Hover 关联高亮 <ActivateRelations />" bodyStyle={{ height: '554px', overflow: 'scroll' }}>
            <Graphin data={data1} layout={{ type: 'concentric' }}>
              <ZoomCanvas disabled />
              <ActivateRelations />
            </Graphin>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="树图的 Click 展开收起 <TreeCollapse />">
            {data2 && (
              <Graphin
                data={data2}
                layout={{
                  type: 'compactBox',
                  direction: 'TB',
                  getId: function getId(d) {
                    return d.id;
                  },
                  getHeight: function getHeight() {
                    return 16;
                  },
                  getWidth: function getWidth() {
                    return 16;
                  },
                  getVGap: function getVGap() {
                    return 80;
                  },
                  getHGap: function getHGap() {
                    return 50;
                  },
                }}
              >
                <TreeCollapse trigger="click" />
              </Graphin>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
