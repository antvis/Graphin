import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
import { Card } from 'antd';
import * as React from 'react';

const CustomTooltip = () => {
  const { tooltip } = React.useContext(GraphinContext);
  const context = tooltip.node;
  const { item } = context;
  const model = item && item.getModel();

  return (
    // @ts-ignore
    <div>
      <Card title="节点信息" style={{ width: '200px' }}>
        ID : {model.id}
      </Card>
    </div>
  );
};

const TooltipDemo: React.FunctionComponent = () => {
  return (
    <div>
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Tooltip bindType="node">
          <CustomTooltip />
        </Tooltip>
      </Graphin>
    </div>
  );
};

export default TooltipDemo;
