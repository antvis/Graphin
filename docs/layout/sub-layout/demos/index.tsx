import React from 'react';
import Graphin, { Utils, GraphinContext, Behaviors } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import AntdMenu from './AntdMenu';

const Demo = () => {
  const [state, setState] = React.useState({
    data: Utils.mock(10).circle().graphin(),
    layout: {
      type: 'grid',
    },
    selected: [],
  });

  const { data, layout } = state;

  const handleChange = item => {
    console.log(item);
  };
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ContextMenu bindType="canvas">
          <AntdMenu handleChange={handleChange} />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default Demo;
