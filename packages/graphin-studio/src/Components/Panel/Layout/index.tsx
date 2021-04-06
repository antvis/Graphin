import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutSelector from './LayoutSelector';
import networkLayouts from './network-layouts';

const { Panel } = Collapse;

interface LayoutPanelProps {}

const LayoutPanel: React.FunctionComponent<LayoutPanelProps> = props => {
  const layout = useSelector(state => state.layout);
  const dispatch = useDispatch();

  const handleChange = value => {
    console.log('value', value);
    dispatch({
      type: 'Update_Layout',
      layout: value,
    });
  };
  const { type, options } = layout;

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['basic-layout', 'sub-layout']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="基础布局" key="basic-layout">
          <LayoutSelector type={type} layouts={networkLayouts} onChange={handleChange} />
        </Panel>
        <Panel header="子图布局" key="sub-layout">
          正在开发中...
        </Panel>
      </Collapse>
    </div>
  );
};

export default LayoutPanel;
