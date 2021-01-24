import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const { FitView } = Behaviors;

const data = Utils.mock(50).circle().graphin();
const layout = {
  type: 'concentric',
  minNodeSpacing: 50,
};

const FocusItem = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.focusItem('node-5', true);
    graph.setItemState('node-5', 'selected', true);
  }, []);
  return null;
};

console.log('network', data);

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <FitView />
        {/* <ZoomCanvas disabled /> */}
        <FocusItem />
      </Graphin>
    </div>
  );
};
