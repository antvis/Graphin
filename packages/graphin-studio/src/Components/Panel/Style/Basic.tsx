import { Col, Row, Select } from 'antd';
import * as React from 'react';

const { Option } = Select;
const modes = [
  {
    id: 'fixed',
    name: '固定颜色',
  },
  {
    id: 'dagre',
    name: '根据度数',
  },
  {
    id: 'keys',
    name: '字段映射',
  },
];

const Basic = () => {
  const handleChange = (type, value) => {};
  return (
    <div>
      <Row>
        <Col>映射模式</Col>
        <Col>
          <Select
            defaultValue={modes[0].id}
            style={{ width: '100%' }}
            onChange={val => {
              handleChange('mode', val);
            }}
          >
            {modes.map(mode => (
              <Option key={mode.id} value={mode.id}>
                {mode.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default Basic;
