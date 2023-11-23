import * as React from 'react';
import { Row, Col, Divider, Dropdown, Menu, Card, Space } from 'antd';
import {
  DownOutlined,
  TrademarkCircleFilled,
  ChromeFilled,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreFilled,
  CopyrightCircleFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
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
  position: 'absolute',
  top: 50,
  right: 30,
  boxShadow: `0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)`,
  width: '300px',
  height: '460px',
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
    <Card title="布局配置" bordered={false} style={{ ...defaultStyle, ...style }} bodyStyle={{ padding: '0px 12px' }}>
      <LayoutMenu handleChange={handleChange} description={description} layouts={layouts} />
      <Divider style={{ margin: '15px 0px' }} />
      <div style={{ height: '260px', overflow: 'scroll' }}>
        <LayoutOptionsPanel options={matchOptions} type={type} key={type} handleChange={handleChange} />
      </div>
    </Card>
  );
};

export default LayoutSelector;
