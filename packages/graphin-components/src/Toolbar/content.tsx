/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { GraphinContext, Graph } from '@antv/graphin';
import './index.less';

export interface ToolBarItemProps {
  /**
   * @description toolbar 的配置选项
   */
  options?: Item[];
  /**
   * @description 点击 toolbar 的回调函数
   */
  onChange?: (graph: Graph, data: any) => void;
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

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <li onClick={onClick}>{children}</li>;
};

const ToolBarContent: React.FunctionComponent<ToolBarItemProps> & {
  Item: typeof Item;
} = props => {
  const graphin = React.useContext(GraphinContext);

  const { options, onChange } = props;

  const handleClick = config => {
    try {
      const { graph } = graphin;

      if (onChange) {
        onChange(graph, config);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { children } = props;
  if (options) {
    return (
      <ul className="graphin-components-toolbar-content">
        {options.map(option => {
          const { key, icon, name } = option;
          return (
            <Item
              key={key || name}
              onClick={() => {
                handleClick(option);
              }}
            >
              {icon} {name}
            </Item>
          );
        })}
      </ul>
    );
  }
  return <ul className="graphin-components-toolbar-content">{children}</ul>;
};

ToolBarContent.Item = Item;

export default ToolBarContent;
