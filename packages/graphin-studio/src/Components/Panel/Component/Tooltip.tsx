import { Col, Row, Select, Switch } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const Basic = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { tooltip, data, allKeys } = state;
  const handleChange = (key: string, value: boolean | string) => {
    dispatch({
      type: 'Update_Tooltip',
      tooltip: {
        ...tooltip,
        [key]: value,
      },
    });
  };
  const { keys, visible, placement, hasArrow } = tooltip;

  const children = allKeys.map((key: string) => {
    return (
      <Option key={key} value={key}>
        {key}
      </Option>
    );
  });
  console.log('allkeys', allKeys, children, 'keys', keys);

  return (
    <div>
      <Row>
        <Col span={8}>是否加载</Col>
        <Col span={16}>
          <Switch
            defaultChecked={visible}
            onChange={checked => {
              handleChange('visible', checked);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>展示位置</Col>
        <Col span={16}>
          <Select
            defaultValue={placement}
            onChange={checked => {
              handleChange('placement', checked);
            }}
            style={{ width: '100%' }}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
            <Option value="center">center</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8}>展示箭头</Col>
        <Col span={16}>
          <Switch
            defaultChecked={hasArrow}
            onChange={checked => {
              handleChange('hasArrow', checked);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>映射字段</Col>
        <Col span={16}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="选择需要映射的字段"
            defaultValue={keys}
            onChange={checked => {
              console.log('checked', checked);
              handleChange('keys', checked);
            }}
          >
            {children}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default Basic;
