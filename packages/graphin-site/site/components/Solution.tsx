import React from 'react';
import { Row, Col, Card, Typography } from 'antd';


const { Title, Paragraph, Text, Link } = Typography;
import './index.less';
// import { description } from 'core-js/fn/symbol/match';
const { Meta } = Card;
interface Item {
  link: string;
  image: string;
  description: string;
}
interface Solutions {
  items: Item[];
  abstract: string;
  style?: React.CSSProperties;
}

const Solution: React.FC<Solutions> = ({ items = [], style, abstract }) => {
  return (
    <div style={style} className="antvis-solution">
      <Typography>
        {/* <Title>解决方案</Title> */}
        <Paragraph>
          {abstract}
        </Paragraph>
      </Typography>
      <Row
        gutter={[
          16,
          { xs: 8, sm: 24, md: 24, lg: 16 },
        ]}
      >
        {/* <Col>{abstract}</Col> */}
        {items.map((item) => {
          const { image, description, link } = item;
          return (
            <Col xs={24} sm={6} md={6} lg={4} xl={4}  >
              <Card
                style={{ width: '100%' }}
                hoverable
                cover={
                  <a href={link} target="_blank" rel="noreferrer">
                    <img style={{ width: '100%' }} src={image} alt={description} />
                  </a>
                }
              >
                <Meta description={description} />
              </Card>
            </Col>
          );
        })}
        <div />
      </Row>
    </div>
  );
};

export default Solution;
