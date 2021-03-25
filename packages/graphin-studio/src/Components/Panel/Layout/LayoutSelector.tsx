import {
  ApartmentOutlined,
  AppstoreFilled,
  BranchesOutlined,
  ChromeFilled,
  CopyrightCircleFilled,
  DownOutlined,
  ShareAltOutlined,
  TrademarkCircleFilled,
} from '@ant-design/icons';
import { Col, Divider, Dropdown, Menu, Row, Space } from 'antd';
import * as React from 'react';
import LayoutOptionsPanel from './LayoutOptionsPanel';
import { Layouts } from './network-layouts';

const iconMapByType = {
  'graphin-force': <ShareAltOutlined />,
  random: <TrademarkCircleFilled />,
  concentric: <ChromeFilled />,
  circular: <BranchesOutlined />,
  force: <AppstoreFilled />,
  dagre: <ApartmentOutlined />,
  grid: <CopyrightCircleFilled />,
  radial: <ShareAltOutlined />,
  gForce: <AppstoreFilled />,
  mds: <AppstoreFilled />,
};
interface LayoutSelectorProps {
  style?: React.CSSProperties;
  /** 布局类型 */
  type: string;
  /** 布局切换的回调函数 */
  onChange: ({ type, options }: { type?: string; options?: unknown }) => void;
  /** 所有布局信息 */
  layouts: Layouts;
}
const defaultStyle: React.CSSProperties = {
  width: '100%',
};
const LayoutMenu = ({ handleChange, description, layouts }) => {
  const [visible, setVisible] = React.useState(false);
  const handleVisibleChange = flag => {
    setVisible(flag);
  };
  const handleChangeLayoutType = e => {
    handleChange(e.key);
    setVisible(false);
  };
  const menu = (
    <Menu onClick={handleChangeLayoutType}>
      {layouts.map(item => {
        const { type, title } = item;
        return (
          <Menu.Item key={type}>
            <Space>
              {iconMapByType[type]} {title}
            </Space>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <Row style={{ paddingTop: '15px' }}>
        <Col span={8}>布局类型</Col>
        <Col span={16}> {description}</Col>
      </Row>
    </Dropdown>
  );
};
const LayoutSelector: React.FunctionComponent<LayoutSelectorProps> = props => {
  const { style, type, onChange, layouts } = props;
  const matchLayout = layouts.find(item => item.type === type);
  console.log(layouts, matchLayout);
  const matchOptions = matchLayout.options;
  const { title } = matchLayout;
  const handleChange = (selectedType, options = {}) => {
    console.log(selectedType);
    if (onChange) {
      onChange({ type: selectedType, options });
    }
  };
  const description = (
    <Space>
      {iconMapByType[type]} {title} <DownOutlined />
    </Space>
  );
  return (
    <>
      <LayoutMenu handleChange={handleChange} description={description} layouts={layouts} />
      <Divider style={{ margin: '15px 0px' }} />
      <div style={{ overflow: 'scroll' }}>
        <LayoutOptionsPanel options={matchOptions} type={type} key={type} handleChange={handleChange} />
      </div>
    </>
  );
};
export default LayoutSelector;
