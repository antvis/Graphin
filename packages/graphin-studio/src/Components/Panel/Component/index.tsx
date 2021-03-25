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

const classification = [
  {
    id: 'basic',
    name: '基础组件',
    children: [
      {
        id: 'tooltip',
        name: '提示框',
        components: MockComponents,
      },
      {
        id: 'contextmenu',
        name: '右键菜单',
        components: MockComponents,
      },
      {
        id: 'legend',
        name: '图例',
        components: MockComponents,
      },

      {
        id: 'toolbar',
        name: '工具栏',
        components: MockComponents,
      },
    ],
  },
  {
    id: 'advance',
    name: '高级组件',
    children: [
      {
        id: 'searchbar',
        name: '搜索栏',
        components: MockComponents,
      },
      {
        id: 'fisheye',
        name: '鱼眼放大镜',
        components: MockComponents,
      },
      {
        id: 'hull',
        name: '轮廓包围',
        components: MockComponents,
      },
    ],
  },
  {
    id: 'behaviors',
    name: '交互组件',
    children: [
      {
        id: 'drag-canvas',
        name: '拖拽画布',
        components: MockComponents,
      },
      {
        id: 'zoom-canvas',
        name: '缩放画布',
        components: MockComponents,
      },
      {
        id: 'brush-select',
        name: '框选',
        components: MockComponents,
      },
      {
        id: 'lasso-select',
        name: '拉索选择',
        components: MockComponents,
      },
      {
        id: 'drag-node-with-force',
        name: '拖拽力导节点',
        components: MockComponents,
      },
      {
        id: 'drag-node',
        name: '拖拽节点',
        components: MockComponents,
      },
    ],
  },
];

const callback = () => {};
const Statistics: React.FunctionComponent<StatisticsProps> = props => {
  return (
    <Tabs defaultActiveKey="node" onChange={callback}>
      {classification.map(item => {
        const { children } = item;
        const defaultActiveKey = children.map(c => c.id);
        return (
          <TabPane tab={item.name} key={item.id}>
            <Collapse
              bordered={false}
              defaultActiveKey={defaultActiveKey}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              {children.map(opt => {
                const { components: Component, name, id } = opt;
                return (
                  <Panel header={name} key={id}>
                    <Component content="正在开发中..." />
                  </Panel>
                );
              })}
            </Collapse>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default Statistics;
