import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import * as React from 'react';
import Basic from './Basic';
import Network from './Network';
import Node from './Node';
import Profile from './Profile';
import Report from './Report';

const { Panel } = Collapse;

interface StatisticsProps {}

const options = [
  {
    id: 'count',
    name: '基本信息',
    components: Basic,
  },

  {
    id: 'network',
    name: '网络指标',
    components: Network,
  },
  {
    id: 'node',
    name: '节点指标',
    components: Node,
  },
  {
    id: 'profile',
    name: '节点画像',
    components: Profile,
  },
  {
    id: 'report',
    name: '分析报表',
    components: Report,
  },
];

const defaultActiveKey = options.map(opt => opt.id);
const Statistics: React.FunctionComponent<StatisticsProps> = props => {
  return (
    <div>
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

export default Statistics;
