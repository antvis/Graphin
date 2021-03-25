/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, Divider } from 'antd';
import * as React from 'react';
import './index.less';

interface Option {
  /** 导航图标 */
  icon: React.ReactElement;
  /** 导航ID */
  id: string;
  /** 导航名称 */
  name: string;
}
interface NavbarProps {
  options: Option[];
  value: Option['id'];
  onChange: (option: Option) => void;
}

const Navbar: React.FunctionComponent<NavbarProps> = props => {
  const { options, value, onChange } = props;

  return (
    <ul className="studio-navbar">
      <li className="navbar-logo">
        <img src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" alt="logo" />
      </li>
      {options.map(opt => {
        const { icon, id, name } = opt;
        const isActive = id === value;
        const className = isActive ? 'navbar-item active' : 'navbar-item';
        const buttonType = isActive ? 'primary' : 'default';

        return (
          <li
            key={id}
            onClick={() => {
              onChange(opt);
            }}
            className={className}
          >
            <span className="icon">
              <Button type={buttonType} shape="circle" icon={icon} />
            </span>
            <span className="name"> {name}</span>
            <Divider />
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
