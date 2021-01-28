import React from 'react';
import * as Graphin from '@antv/graphin';
import { isArray } from '@antv/util';
import './index.less';

const { GraphinContext } = Graphin;

const defaultStyle: React.CSSProperties = {
  // width: 200,
  background: '#fff',
};

export interface IToolBarItem {
  name: string | JSX.Element;
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ToolbarDirectionType = 'vertical' | 'horizontal';

export interface ToolBarProps {
  children?: React.ReactChildren | JSX.Element | JSX.Element[];
  /**
   * @description toolbar 的配置选项
   */
  options?: IToolBarItem[];
  /**
   * @description 点击 toolbar 的回调函数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (graph: Graphin.Graph, data: any) => void;
  style?: React.CSSProperties;
  direction?: ToolbarDirectionType;
  x?: number;
  y?: number;
}

const ToolBarItem = (props) => {
  const { children, onClick = () => {} } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={onClick} onKeyDown={onClick}>
      {children}
    </li>
  );
};

const ToolBar: React.FunctionComponent<ToolBarProps> & { Item: typeof ToolBarItem } = (props) => {
  const { children, style = {}, direction = 'horizontal', x = 0, y = 0, options, onChange } = props;
  const graphin = React.useContext(GraphinContext);

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
  };

  // 水平方向，默认在右上角
  // right = 0  top = 0
  if (direction === 'horizontal') {
    positionStyle.right = x;
    positionStyle.top = y;
    // positionStyle['width'] = width || 200;
  } else if (direction === 'vertical') {
    // 垂直方向，默认在左下角
    // left = 0  bottom = 0
    positionStyle.left = x;
    positionStyle.bottom = y;
    // positionStyle['width'] = width || 50;
  }

  /** 将一些方法和数据传递给子组件 */
  graphin.toolbar = {
    ...graphin.toolbar,
  };

  const handleClick = (config) => {
    try {
      const { graph } = graphin;

      if (onChange) {
        onChange(graph, config);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (options) {
    return (
      <div
        className="graphin-components-toolbar"
        style={{ ...defaultStyle, ...style, ...positionStyle }}
        key="graphin-components-toolbar"
      >
        <ul
          className="graphin-components-toolbar-content"
          style={{ display: direction === 'horizontal' ? 'flex' : '' }}
        >
          {options.map((option) => {
            const { key, name } = option;
            return (
              <ToolBarItem
                key={key || name}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {name}
              </ToolBarItem>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      style={{ ...defaultStyle, ...style, ...positionStyle }}
      key="graphin-components-toolbar"
      className="graphin-components-toolbar"
    >
      {isArray(children) || (children && (children as JSX.Element).type === ToolBarItem) ? (
        <ul
          className="graphin-components-toolbar-content"
          style={{ display: direction === 'horizontal' ? 'flex' : '' }}
        >
          {children}
        </ul>
      ) : (
        children
      )}
    </div>
  );
};

ToolBar.Item = ToolBarItem;

export default ToolBar;
