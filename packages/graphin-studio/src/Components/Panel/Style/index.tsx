import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Tabs } from 'antd';
import * as React from 'react';
import './index.less';

const { TabPane } = Tabs;

const { Panel } = Collapse;

interface StatisticsProps {}

const MockComponents = ({ content }) => {
  return <div>{content}</div>;
};

const nodes = [
  {
    id: 'keyshape',
    name: '形状',
    components: MockComponents,
  },
  {
    id: 'label',
    name: '标签',
    components: MockComponents,
  },
  {
    id: 'icon',
    name: '图标',
    components: MockComponents,
  },
  {
    id: 'badges',
    name: '徽标',
    components: MockComponents,
  },
  {
    id: 'halo',
    name: '光晕',
    components: MockComponents,
  },
];
const edges = [
  {
    id: 'keyshape',
    name: '形状',
    components: MockComponents,
  },
  {
    id: 'label',
    name: '标签',
    components: MockComponents,
  },
  {
    id: 'halo',
    name: '光晕',
    components: MockComponents,
  },
];

const node_defaultActiveKey = nodes.map(opt => opt.id);
const edge_defaultActiveKey = edges.map(opt => opt.id);

const callback = () => {};
const Statistics: React.FunctionComponent<StatisticsProps> = props => {
  return (
    <div>
      <Tabs defaultActiveKey="node" onChange={callback}>
        <TabPane tab="节点样式" key="node">
          <Collapse
            bordered={false}
            defaultActiveKey={node_defaultActiveKey}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            {nodes.map(opt => {
              const { components: Component, name, id } = opt;
              return (
                <Panel header={name} key={id}>
                  <Component content="正在开发中..." />
                </Panel>
              );
            })}
          </Collapse>
        </TabPane>
        <TabPane tab="边的样式" key="edge">
          <Collapse
            bordered={false}
            defaultActiveKey={edge_defaultActiveKey}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            {edges.map(opt => {
              const { components: Component, name, id } = opt;
              return (
                <Panel header={name} key={id}>
                  <Component content="正在开发中..." />
                </Panel>
              );
            })}
          </Collapse>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistics;
