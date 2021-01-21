//@ts-nocheck
import React from 'react';
import { Select } from 'antd'; // 引入Graphin CSS
import {
  TrademarkCircleFilled,
  ChromeFilled,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreFilled,
  CopyrightCircleFilled,
  CustomerServiceFilled,
  ShareAltOutlined,
} from '@ant-design/icons';

const iconMap = {
  'graphin-force': <ShareAltOutlined />,
  random: <TrademarkCircleFilled />,
  concentric: <ChromeFilled />,
  circle: <BranchesOutlined />,
  force: <AppstoreFilled />,
  dagre: <ApartmentOutlined />,
  grid: <CopyrightCircleFilled />,
  radial: <ShareAltOutlined />,
};

const SelectOption = Select.Option;

interface ILayputOption {
  type: string;
  label?: string;
}
interface ILayoutSelectorProps {
  options: ILayputOption[];
  onChange: (value: string) => void;
  value?: string;
}

const LayoutSelector: React.FC<ILayoutSelectorProps> = ({ value = 'graphin-force', onChange, options }) => {
  // 包裹在graphin内部的组件，将获得graphin提供的额外props
  return (
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <Select style={{ width: '150px' }} value={value} onChange={onChange}>
        {options.map(item => {
          const { type, label } = item;
          const iconComponent = iconMap[type] || <CustomerServiceFilled />;
          return (
            <SelectOption key={type} value={type}>
              {iconComponent} &nbsp;
              {label}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};

export default LayoutSelector;
