import React from 'react';

import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import {
  TrademarkCircleOutlined,
  ChromeOutlined,
  BranchesOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  CopyrightCircleOutlined,
  CustomerServiceOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

const iconMap = {
  random: <TrademarkCircleOutlined />,
  concentric: <ChromeOutlined />,
  circle: <CopyrightCircleOutlined />,
  force: <BranchesOutlined />,
  dagre: <ApartmentOutlined />,
  grid: <AppstoreOutlined />,
  radial: <ShareAltOutlined />,
};
const radioStyle: React.CSSProperties = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export interface LayoutValue {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  desc: string;
  icon: string;
  disabled?: boolean;
}
interface Value {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
}

interface LayoutSelectorProps {
  value: Value;
  onChange: (value: Value) => void;
  layouts: LayoutValue[];
}

const LayoutSelector = (props: LayoutSelectorProps) => {
  const { value, onChange, layouts } = props;

  const handleChange = ({ target }: RadioChangeEvent) => {
    const layout = layouts.find((item) => {
      return item.name === target.value;
    });
    if (onChange) {
      onChange({
        name: layout.name,
        options: layout.options,
      });
    }
  };
  return (
    <div className="layout-selector">
      <Radio.Group value={value.name} onChange={handleChange}>
        {layouts.map((item) => {
          const { name, disabled, desc } = item;
          const iconComponent = iconMap[name] || <CustomerServiceOutlined />;
          return (
            <Radio key={name} value={name} disabled={disabled} style={radioStyle}>
              {iconComponent} &nbsp;{desc}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default LayoutSelector;
