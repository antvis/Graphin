import Graphin, { Behaviors, GraphinContext, Utils, registerIconFonts } from '@antv/graphin';
import React, { useEffect } from 'react';

const { DragCanvas } = Behaviors;

/** 异步方法，需要提前注册 */
registerIconFonts();

const data = Utils.mock(10).circle().graphin();
const layout = {
  type: 'force',
};

const FocusItem = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.focusItem('node-3');
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
        {/* <FitView /> */}
        {/* <ZoomCanvas disabled /> */}
        <FocusItem />
        <DragCanvas shouldBegin={shouldBegin} />
      </Graphin>
    </div>
  );
};
