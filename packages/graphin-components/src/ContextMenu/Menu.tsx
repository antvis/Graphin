/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { GraphinContext } from '@antv/graphin';
import './index.less';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
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
const Item = (props) => {
  const { children, onClick } = props;
  const graphin = React.useContext(GraphinContext);
  const handleClose = () => {
    onClick();
    const { contextmenu } = graphin;
    // 临时方案
    if (contextmenu.node) {
      contextmenu.node.handleClose();
    }
    if (contextmenu.edge) {
      contextmenu.edge.handleClose();
    }
    if (contextmenu.canvas) {
      contextmenu.canvas.handleClose();
    }
  };
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <li onClick={handleClose}>{children}</li>;
};

const Menu: React.FunctionComponent<MenuProps> & {
  Item: typeof Item;
} = (props) => {
  const { bindType = 'node' } = props;
  const graphin = React.useContext(GraphinContext);
  console.log(graphin.contextmenu);
  const { options, onChange } = props;

  const handleClick = (e) => {
    try {
      const { contextmenu } = graphin;

      let item = null;
      if (bindType === 'node') {
        item = contextmenu.node.item.getModel();
      }
      if (bindType === 'edge') {
        item = contextmenu.edge.item.getModel();
      }
      if (bindType === 'canvas') {
        item = null;
      }
      if (onChange) {
        onChange(e, item);
        contextmenu[bindType].handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { children } = props;
  if (options) {
    return (
      <ul className="graphin-components-contextmenu-content">
        {options.map((c) => {
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
