import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
import React from 'react';
import Column from './Column';

const { Panel } = Collapse;
const { Option } = Select;

interface FilterProps {}
const options = [
  {
    id: 'city',
    name: '城市信息',
    components: Column,
  },
];

function handleChange(value: string[]) {
  console.log(`selected ${value}`);
}

const defaultActiveKey = options.map(opt => opt.id);
const Filter: React.FunctionComponent<FilterProps> = props => {
  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['city']}
        onChange={handleChange}
      >
        <Option key="city" value="city">
          city
        </Option>
        <Option key="age" value="age">
          age
        </Option>
      </Select>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        {options.map(opt => {
          const { components: Component, name, id } = opt;
          return (
            <Panel header={name} key={id}>
              <Component />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Filter;
