import { CaretRightOutlined, ExpandAltOutlined, TagFilled } from '@ant-design/icons';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu, Tooltip } from '@antv/graphin-components';
import { Collapse, Input, Radio, Switch } from 'antd';
import * as React from 'react';

const { Menu } = ContextMenu;

const { Panel } = Collapse;
const { TextArea } = Input;

export type PlacementType = 'top' | 'bottom' | 'right' | 'left';

const TooltipDemo: React.FunctionComponent = () => {
  const [placement, setPlacement] = React.useState<PlacementType>('top');
  const [hasArrow, setArrow] = React.useState<boolean>(true);
  const [styleText, setStyleText] = React.useState<string>(`{
    "background":"#fff",
    "width":"200px"
  }`);
  let style = {};
  try {
    style = JSON.parse(styleText);
  } catch (error) {
    console.log(error);
  }
  console.log(style, styleText);
  return (
    <div style={{ position: 'relative' }}>
      <Collapse
        style={{ width: '320px', position: 'absolute', top: '0px', left: '0px', zIndex: 999 }}
        defaultActiveKey={['pleacement', 'arrow', 'style']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="设置pleacement" key="pleacement">
          <Radio.Group
            onChange={e => {
              setPlacement(e.target.value);
            }}
            value={placement}
          >
            <Radio value="top">top</Radio>
            <Radio value="bottom">bottom</Radio>
            <Radio value="left">left</Radio>
            <Radio value="right">right</Radio>
          </Radio.Group>
        </Panel>
        <Panel header="是否需要小箭头" key="arrow">
          <Switch
            defaultChecked
            onChange={checked => {
              setArrow(checked);
            }}
          />
        </Panel>
        <Panel header="设置样式 ( JSON 格式 ) " key="style">
          <TextArea
            value={styleText}
            onChange={e => {
              console.log(e.target.value);
              setStyleText(e.target.value);
            }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Panel>
      </Collapse>

      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Tooltip bindType="node" placement={placement} hasArrow={hasArrow} style={style}>
          <Tooltip.Node>
            {model => {
              return (
                <div>
                  {model.id}
                  <li>{model.id}</li>
                  <li>{model.id}</li>
                  <li>{model.id}</li>
                  <li>{model.id}</li>
                </div>
              );
            }}
          </Tooltip.Node>
        </Tooltip>
        <ContextMenu>
          <Menu
            bindType="node"
            options={[
              {
                key: 'tag',
                icon: <TagFilled />,
                name: '打标',
              },

              {
                key: 'expand',
                icon: <ExpandAltOutlined />,
                name: '扩散',
              },
            ]}
          />
        </ContextMenu>
        {/* <Tooltip bindType="edge">
          <Tooltip.Edge>
            {model => {
              return <span>{model.id}</span>;
            }}
          </Tooltip.Edge>
        </Tooltip> */}
      </Graphin>
    </div>
  );
};

export default TooltipDemo;
