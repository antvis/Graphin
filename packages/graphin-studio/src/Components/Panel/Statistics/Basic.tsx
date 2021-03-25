import { Col, Row } from 'antd';
import * as React from 'react';

interface BasicProps {}

const Basic: React.FunctionComponent<BasicProps> = props => {
  return (
    <div>
      <Row>
        <Col span={12}>Nodes: 10</Col>
        <Col span={12}>Edges: 18</Col>
      </Row>
    </div>
  );
};

export default Basic;
