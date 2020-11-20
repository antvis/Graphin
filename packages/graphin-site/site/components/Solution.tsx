import React from 'react';
import { Row, Col, Card } from 'antd';
import './index.less';
import { description } from 'core-js/fn/symbol/match';
const { Meta } = Card;
interface Item {
  link: string;
  image: string;
  description: string;
}
interface Solutions {
  items: Item[];
  style?: React.CSSProperties;
}

const Solution: React.FC<Solutions> = ({ items = [], style }) => {
  return (
    <div style={style} className="antvis-solution">
      <Row
        gutter={[
          { xs: 8, sm: 24, md: 32, lg: 48 },
          { xs: 8, sm: 24, md: 32, lg: 48 },
        ]}
      >
        {items.map((item) => {
          const { image, description, link } = item;
          return (
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card style={{ width: '100%' }} hoverable cover={<img src={image} onClick={link} />}>
                <Meta description={description} />
              </Card>
            </Col>
          );
        })}
        <div></div>
      </Row>
    </div>
  );
};

export default Solution;
