/**
 * inline: true
 */

import { Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const demos = [
  {
    title: '【01】节点样式',
    desc: 'Graphin内置节点包含：容器，标签，光晕，图标，徽标 5部分，每一部分均可以通过数据驱动',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*XemcTKOUwnYAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/render/node',
  },
  {
    title: '【02】边的样式',
    desc: 'Graphin内置的边包含：路径，标签，光晕 3部分，每一部分均可以通过数据驱动。针对业务中常用的标签背景，自环，多边，虚线等情况，也都有对应的数据设置',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*RBkcT5M3dCQAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/render/edge',
  },
  {
    title: '【03】丰富的布局',
    desc: 'Graphin内置10款网图布局，4款树图布局，满足你对于不同数据类型，不同分析场景的布局需求',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*vhqGTIjetxQAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/layout/network',
  },
  {
    title: '【04】细腻的交互',
    desc: 'Graphin 提供了 13 种交互组件。包括画布的缩放，平移，圈选，拉索，自动Resize，也包括元素的拖拽，选中，悬停，高亮，展开收起等，满足你对于不同分析场景的交互需求',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*L-htTIT2powAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/behaviors/behaviors',
  },
  {
    title: '【05】完备的分析组件',
    desc: '目前 Graphin 提供了 7 种分析组件：分别为右键菜单，提示框，小地图，工具栏，鱼眼放大镜，轮廓，图例。未来将提供 17+ 的分析组件',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*LMvrRKKslnwAAAAAAAAAAAAAARQnAQ',
    link: '/components/built-in/context-menu',
  },
  {
    title: '【06】强大的分析能力',
    desc: 'Graphin 梳理图分析业务中常用的可视分析能力，形成体系的解决方案白皮书，同时在技术层面实现 算法分析，扩散分析，筛选分析，聚类分析等多种分析能力。',
    image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*Yb5tTaIlj2sAAAAAAAAAAAAAARQnAQ',
    link: '/graphin/layout/dynamic-layout',
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
