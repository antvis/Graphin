import Graphin, { Behaviors, GraphinTreeData, Utils } from '@antv/graphin';
import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const { TreeCollapse } = Behaviors;

const walk = (node: GraphinTreeData, callback: (node: GraphinTreeData) => void) => {
  callback(node);
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      walk(child, callback);
    });
  }
};

const layouts = [
  {
    type: 'mindmap',
    options: {
      direction: 'H',
      getHeight: () => {
        return 26;
      },
      getWidth: () => {
        return 26;
      },
      getVGap: () => {
        return 26;
      },
      getHGap: () => {
        return 50;
      },
    },
    title: '脑图树布局',
  },
];

export default () => {
  const [data, setData] = useState(Utils.mock(20).tree().graphinTree());
  useEffect(() => {
    console.info('----------------', data);
    walk(data, node => {
      node.style = {
        label: {
          value: node.id,
        },
      };
    });
  }, [data]);
  return (
    <div>
      <Row gutter={[12, 12]}>
        {layouts.map(item => {
          const { type, options, title } = item;
          const desc = <code>{`type:${type}`}</code>;
          return (
            <Col span={24} key={type}>
              <Card title={title} extra={desc}>
                <Graphin data={data} layout={{ type, ...options }} fitView>
                  <TreeCollapse />
                </Graphin>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Button
        onClick={() => {
          setData(Utils.mock(30).tree().graphinTree());
        }}
      >
        test
      </Button>
    </div>
  );
};
