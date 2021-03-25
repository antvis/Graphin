import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import * as React from 'react';
import Language from './Language';
import Publish from './Publish';
import Theme from './Theme';

const { Panel } = Collapse;

interface SystemProps {}

const options = [
  {
    id: 'theme',
    name: '主题设置',
    components: Theme,
  },
  {
    id: 'language',
    name: '语言设置',
    components: Language,
  },
  {
    id: 'publish',
    name: '应用发布',
    components: Publish,
  },
];

const defaultActiveKey = options.map(opt => opt.id);
const System: React.FunctionComponent<SystemProps> = props => {
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

export default System;
