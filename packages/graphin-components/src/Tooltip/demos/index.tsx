import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';

const tooltipStyles = {
  // height: `${nodeSize}px`,
  // width: `${nodeSize}px`,
  // background: 'transparent',
};

const TooltipDemo: React.FunctionComponent = () => {
  return (
    <div>
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Tooltip
          bindType="node"
          style={{
            ...tooltipStyles,
          }}
        >
          <Tooltip.Node>
            {(model) => {
              return <span>{model.id}</span>;
            }}
          </Tooltip.Node>
        </Tooltip>

        <Tooltip bindType="edge">
          <Tooltip.Edge>
            {(model) => {
              return <span>{model.id}</span>;
            }}
          </Tooltip.Edge>
        </Tooltip>
      </Graphin>
    </div>
  );
};

export default TooltipDemo;
