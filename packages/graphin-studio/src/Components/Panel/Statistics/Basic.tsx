import { Col, Row } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

interface BasicProps {}

const Basic: React.FunctionComponent<BasicProps> = props => {
  const data = useSelector(state => state.data);
  const { nodes, edges } = data;

  return (
    <div>
      <Row>
        <Col span={12}>Nodes: {nodes.length}</Col>
        <Col span={12}>Edges: {edges.length}</Col>
      </Row>
    </div>
  );
};

export default Basic;
