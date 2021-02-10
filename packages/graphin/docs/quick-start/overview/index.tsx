/**
 * inline: true
 */

import React from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const demos = [
  {
    title: '节点样式',
    desc: 'Graphin内置节点包含：容器，标签，光晕，图标，徽标 5部分，每一部分均可以通过数据驱动',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*JoptTZdYEEYAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/render/node',
  },
  {
    title: '边的样式',
    desc:
      'Graphin内置的边包含：路径，标签，光晕 3部分，每一部分均可以通过数据驱动。针对业务中常用的标签背景，自环，多边，虚线等情况，也都有对应的数据设置',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*RBkcT5M3dCQAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/render/edge',
  },
  {
    title: '丰富的布局',
    desc: 'Graphin内置10款网图布局，4款树图布局，满足你对于不同数据类型，不同分析场景的布局需求',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*vhqGTIjetxQAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/layout/network',
  },
  {
    title: '细腻的交互',
    desc:
      'Graphin提供了13种交互组件。包括画布的缩放，平移，圈选，拉索，自动Resize，也包括元素的拖拽，选中，悬停，高亮，展开收起等，满足你对于不同分析场景的交互需求',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*L-htTIT2powAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/behaviors/behaviros',
  },
];
export default () => {
  return (
    <div style={{ padding: '30px', background: '#ececec' }}>
      <Row gutter={[16, 16]}>
        {demos.map(c => {
          const { title, desc, image, link } = c;
          return (
            <Col span={8} key={title}>
              <Link to={link}>
                <Card hoverable bordered={false} cover={<img alt="example" src={image} />}>
                  <Meta title={title} description={desc} />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
