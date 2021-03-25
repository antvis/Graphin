import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import * as React from 'react';
import Basic from './Basic';

const { Panel } = Collapse;

interface AlgorithmProps {}

const options = [
  {
    id: 'shortest-path',
    name: '最短路径',
    components: Basic,
  },
  {
    id: 'mini-spanning-tree',
    name: '最小生成树',
    components: Basic,
  },
  {
    id: 'loop-detection',
    name: '环路检测',
    components: Basic,
  },
  {
    id: 'pattern-matching',
    name: '模式匹配',
    components: Basic,
  },
  {
    id: 'auto-clustering',
    name: '自动聚类',
    components: Basic,
  },
  {
    id: 'node-importance',
    name: '节点重要程度',
    components: Basic,
  },
  {
    id: 'common-neighbor',
    name: '共同邻居',
    components: Basic,
  },
];

const defaultActiveKey = options.map(opt => opt.id);
const Algorithm: React.FunctionComponent<AlgorithmProps> = props => {
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

export default Algorithm;
