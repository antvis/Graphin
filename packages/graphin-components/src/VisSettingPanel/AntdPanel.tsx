import React from 'react';
import { Collapse, Card, Tabs } from 'antd';
import { NodeStyle } from './index';
import LabelSetting from './components/LabelSetting';
import IconSetting from './components/IconSetting';
import KeyShapeSetting from './components/KeyShapeSetting';

const { Panel } = Collapse;
const { TabPane } = Tabs;

interface AntdPanelProps {
  nodeStyleSchema: NodeStyle;
  handleNodeStyleChange: (value: any) => void;
}

const AntdPanel: React.FunctionComponent<AntdPanelProps> = (props) => {
  const { nodeStyleSchema, handleNodeStyleChange } = props;
  const { label, badges, icon, ...keyShape } = nodeStyleSchema;
  const handleChange = (shema) => {
    console.log('shema', shema);
    handleNodeStyleChange(shema);
  };

  return (
    <div>
      <Card title="可视化配置面板" bordered={false} style={{ width: 350 }} bodyStyle={{ padding: '0px 12px' }}>
        <Tabs defaultActiveKey="node">
          <TabPane tab="Node" key="node">
            <Collapse defaultActiveKey={['keyshape']} bordered={false} style={{ background: '#fff' }}>
              <Panel header="节点" key="keyshape">
                <KeyShapeSetting handleChange={handleChange} {...keyShape} />
              </Panel>
              <Panel header="标签" key="label">
                <LabelSetting handleChange={handleChange} {...label} />
              </Panel>
              <Panel header="图标" key="icon">
                <IconSetting handleChange={handleChange} {...icon} />
              </Panel>
              <Panel header="徽标" key="badges"></Panel>
            </Collapse>
          </TabPane>
          <TabPane tab="Edge" key="edge"></TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AntdPanel;
