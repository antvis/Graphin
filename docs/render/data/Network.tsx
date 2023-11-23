import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const { FitView, DragCanvas } = Behaviors;

const data = Utils.mock(10).circle().graphin();
const layout = {
  type: 'concentric',
  minNodeSpacing: 50,
};

const FocusItem = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.focusItem('node-3', true);
    graph.setItemState('node-3', 'selected', true);
  }, []);
  return null;
};

console.log('network', data);
const shouldBegin = () => {
  return true;
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <FitView />
        {/* <ZoomCanvas disabled /> */}
        <FocusItem />
        <DragCanvas shouldBegin={shouldBegin} />
      </Graphin>
    </div>
  );
};
