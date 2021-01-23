import * as React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
import { Popover } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const nodeSize = 40;
const tooltipStyles = {
  height: `${nodeSize}px`,
  width: `${nodeSize}px`,
  background: 'transparent',
};

const AntdTooltip = () => {
  const { tooltip } = React.useContext(GraphinContext);
  const context = tooltip.node;
  const { item } = context;
  const model = item && item.getModel();
  return (
    <Popover placement="topLeft" title={model.id} content={content}>
      <div style={tooltipStyles} />
    </Popover>
  );
};

const TooltipDemo: React.FunctionComponent = () => {
  return (
    <div>
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Tooltip
          bindType="node"
          style={{
            ...tooltipStyles,
            transform: `translate(-${nodeSize / 2}px,-${nodeSize / 2}px)`,
            // background: 'red',
          }}
        >
          <AntdTooltip />
        </Tooltip>
      </Graphin>
    </div>
  );
};

export default TooltipDemo;
