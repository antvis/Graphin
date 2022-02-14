import React from 'react';
import getContainerStyles from './getContainerStyles';
import useTooltip from './useTooltip';

const defaultStyle: React.CSSProperties = {
  width: '120px',
  boxShadow: '0 4px 12px rgb(0 0 0 / 15%)',
};

export interface TooltipProps {
  /**
   * @description tooltip绑定的图元素
   * @default node\
   */
  bindType?: 'node' | 'edge';
  /**
   * @description children
   * @type  React.ReactChild | JSX.Element
   */
  children: React.ReactChild | JSX.Element;
  /**
   * @description styles
   */
  style?: React.CSSProperties;
  /**
   * @description Tooltip 的位置
   */
  placement?: 'top' | 'bottom' | 'right' | 'left' | 'center';
  /**
   * @description 是否展示小箭头
   * @description.en-US display arrow
   */
  hasArrow?: boolean;
}

// let containerRef: HTMLDivElement | null;

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const { children, bindType = 'node', style, placement = 'top', hasArrow } = props;
  const { x, y, visible, item } = useTooltip({ bindType });

  let nodeSize = 40;

  try {
    if (item) {
      const { type } = item.getModel();
      if (type === 'graphin-cirle') {
        const { style } = item.getModel();
        if (style) {
          nodeSize = style.keyshape.size as number;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  const padding = 12;
  const containerPosition = getContainerStyles({ placement, nodeSize: nodeSize + padding, x, y, bindType, visible });
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    ...containerPosition,
  };

  if (typeof children !== 'function') {
    console.error('<Tooltip /> children should be a function');
    return null;
  }

  return (
    <>
      <div
        className={`graphin-components-tooltip ${placement}`}
        // @ts-ignore
        style={{ ...defaultStyle, ...positionStyle, ...style }}
      >
        {visible && (
          <div>
            {hasArrow && <div className={`tooltip-arrow ${placement}`} />}
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
