import React from 'react';
import Graphin, { Utils, Behaviors, GraphinTreeData } from '@antv/graphin';
import { Row, Col, Card } from 'antd';

const { ZoomCanvas, TreeCollapse } = Behaviors;
const data = Utils.mock(20).tree().graphinTree();

const walk = (node: GraphinTreeData, callback: (node: GraphinTreeData) => void) => {
  callback(node);
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      walk(child, callback);
    });
  }
};

walk(data, node => {
  node.style = {
    label: {
      value: node.id,
    },
  };
});

const layouts = [
  {
    type: 'compactBox',
    options: {
      direction: 'LR',
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 26;
      },
      getWidth: function getWidth() {
        return 26;
      },
      getVGap: function getVGap() {
        return 26;
      },
      getHGap: function getHGap() {
        return 100;
      },
    },
    title: '紧凑树布局',
  },

  {
    type: 'indented',
    options: {
      direction: 'LR',
      dropCap: false,
      indent: 200,
      getHeight: () => {
        return 60;
      },
    },
    title: '缩进树布局',
  },
  {
    type: 'dendrogram',
    options: {
      direction: 'TB', // H / V / LR / RL / TB / BT
      nodeSep: 40,
      rankSep: 100,
    },
    title: '生态树布局',
  },
  {
    type: 'dendrogram',
    options: {
      direction: 'LR',
      nodeSep: 26,
      rankSep: 100,
      radial: true,
    },
    title: '辐射树布局',
  },
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
  return (
    <div>
      <Row gutter={[12, 12]}>
        {layouts.map(item => {
          const { type, options, title } = item;
          const desc = <code>{`type:${type}`}</code>;
          return (
            <Col span={24} key={type}>
              <Card title={title} extra={desc}>
                <Graphin data={data} layout={{ type, ...options }}>
                  <TreeCollapse />
                </Graphin>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
