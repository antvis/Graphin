/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ContextMenuContext from './Context'
import './index.less';

export interface MenuProps {
  /**
   * @description 绑定元素，必选
   * @default node
   */
  bindType: string;
  /**
   * @description Menu的配置选项
   */
  options?: Item[];
  /**
   * @description Menu回调函数
   */
  onChange?: (item: Item, data: any) => void;
  /**
   * @description Children
   * @type JSX.Element |  JSX.Element[]
   */
  children?: JSX.Element | React.ReactChildren | JSX.Element[];
}

export interface Item {
  name: string;
  key?: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const Item = props => {
  const { children, onClick = () => {} } = props;
  const { item, handleClose: close } = React.useContext(ContextMenuContext);
  const handleClose = (e) => {
    onClick(e, item ? item.getModel() : undefined);
    close && close(); // 关闭菜单
  };
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <li onClick={handleClose}>{children}</li>;
};

const Menu: React.FunctionComponent<MenuProps> & {
  Item: typeof Item;
} = props => {
  const { bindType = 'node', options, onChange = () => {} } = props;
  const { item, handleClose: close } = React.useContext(ContextMenuContext);

  const handleClick = e => {
    onChange(e, item ? item.getModel() : undefined);
    close && close(); // 关闭菜单
  };

  const { children } = props;
  if (options) {
    return (
      <ul className="graphin-components-contextmenu-content">
        {options.map(c => {
          const { key, icon, name } = c;
          return (
            <Item
              key={key || name}
              onClick={() => {
                handleClick(c);
              }}
            >
              {icon} {name}
            </Item>
          );
        })}
      </ul>
    );
  }
  return <ul className="graphin-components-contextmenu-content">{children}</ul>;
};

Menu.Item = Item;

export default Menu;
