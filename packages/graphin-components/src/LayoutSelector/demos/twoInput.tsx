// @ts-ignore
import React from 'react';
import { Input, InputNumber, Form } from 'antd';

const TwoInput = () => {
  return (
    <Input.Group>
      <Form.Item id="x" extra="x 坐标" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
        <InputNumber size="small" style={{ width: 112 }} />
      </Form.Item>
      <Form.Item id="y" extra="y 坐标" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
        <InputNumber size="small" style={{ width: 112 }} />
      </Form.Item>
    </Input.Group>
  );
};

export default TwoInput;
