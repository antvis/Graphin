import * as Graphin from '@antv/graphin';
import React from 'react';
import './index.less';

const { GraphinContext } = Graphin;

const defaultStyle: React.CSSProperties = {
  background: '#fff',
};

export interface ToolBarItemType {
  name: string | JSX.Element;
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ToolbarDirectionType = 'vertical' | 'horizontal';

export interface ToolBarProps {
  /**
   * @description 可以放置自定义组件
   */
  children?: React.ReactChildren | JSX.Element | JSX.Element[];
  /**
   * @description toolbar 的配置选项
   */
  options?: ToolBarItemType[];
  /**
   * @description 点击 toolbar 的回调函数
   */
  /**
   * @description 回调函数，仅当options存在的时候才有效
   */
  onChange?: (context: Graphin.GraphinContextType, option: ToolBarItemType) => void;
  /**
   * @description ToolbarItem的布局位置：'vertical' | 'horizontal'
   * @default horizontal
   */
  direction?: ToolbarDirectionType;
  /**
   * @description Toolbar的样式，可以指定位置
   * @default {position:"absolute",background:"#fff"} 当 direction 水平方向 {right:0,top:0} ,当 direction 垂直方向，默认放置{left:0,bottom:0}
   */
  style?: React.CSSProperties;
}

const ToolbarItem = props => {
  const { children, onClick = () => {} } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={onClick} onKeyDown={onClick}>
      {children}
    </li>
  );
};

const Toolbar: React.FunctionComponent<ToolBarProps> & { Item: typeof ToolbarItem } = props => {
  const { children, style = {}, direction = 'horizontal', options, onChange } = props;
  const graphin = React.useContext(GraphinContext);
  const isHorizontal = direction === 'horizontal';
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
  };
  // 水平方向，默认在右上角
  if (isHorizontal) {
    positionStyle.right = 0;
    positionStyle.top = 0;
  } else {
    // 垂直方向，默认在左下角
    positionStyle.left = 0;
    positionStyle.bottom = 0;
  }

  const handleClick = option => {
    try {
      if (onChange) {
        onChange(graphin, option);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (options) {
    return (
      <div
        className="graphin-components-toolbar"
        // @ts-ignore
        style={{ ...defaultStyle, ...positionStyle, ...style }}
      >
        <ul className="graphin-components-toolbar-content" style={{ display: isHorizontal ? 'flex' : '' }}>
          {options.map(option => {
            const { key, name } = option;
            return (
              <ToolbarItem
                key={key || name}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {name}
              </ToolbarItem>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      // @ts-ignore
      style={{ ...defaultStyle, ...positionStyle, ...style }}
      className="graphin-components-toolbar"
    >
      {Array.isArray(children) || (children && (children as JSX.Element).type === ToolbarItem) ? (
        <ul className="graphin-components-toolbar-content" style={{ display: isHorizontal ? 'flex' : '' }}>
          {children}
        </ul>
      ) : (
        children
      )}
    </div>
  );
};

Toolbar.Item = ToolbarItem;

export default Toolbar;
