import { ModelConfig } from '@antv/g6';
import React from 'react';
import getContainerStyles from './getContainerStyles';
import './index.less';
import useTooltip, { State } from './useTooltip';

export interface TooltipValue {
  bindType: 'node' | 'edge';
  item: State['item'];
  id: string;
  model: ModelConfig;
}

const defaultStyle: React.CSSProperties = {
  width: '120px',
  boxShadow: '0 4px 12px rgb(0 0 0 / 15%)',
};

export interface TooltipProps {
  /**
   * @description tooltip绑定的图元素
   * @default node
   */
  bindType?: 'node' | 'edge';
  /**
   * @description children
   * @type  React.ReactChild | JSX.Element
   */
  children: (props: TooltipValue) => React.ReactNode;
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

const container = React.createRef<HTMLDivElement>();

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  const { children, bindType = 'node', style, placement = 'top', hasArrow } = props;
  const { x, y, visible, item } = useTooltip({ bindType, container });

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
  
  const positionStyle = {
    position: 'absolute',
    ...containerPosition,
  };

  if (typeof children !== 'function') {
    console.error('<Tooltip /> children should be a function');
    return null;
  }

  const model = (item && !item.destroyed && item.getModel && item.getModel()) || {};
  const id = model.id || '';
  return (
    <>
      <div
        ref={container}
        className={`graphin-components-tooltip ${placement}`}
        // @ts-ignore
        style={{ ...defaultStyle, ...positionStyle, ...style }}
      >
        {visible && (
          <div>
            {hasArrow && <div className={`tooltip-arrow ${placement}`} />}
            {children({ item, bindType, model, id })}
          </div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
