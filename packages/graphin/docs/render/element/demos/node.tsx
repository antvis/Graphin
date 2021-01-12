import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';

const icons = Graphin.registerFontFamily(IconLoader);

const { ZoomCanvas, Hoverable } = Behaviors;

const EventCenter = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.on('node:mouseenter', evt => {
      graph.setItemState(evt.item, 'hover', true);
    });
    graph.on('node:mouseleave', evt => {
      graph.setItemState(evt.item, 'hover', false);
    });
  }, []);

  return null;
};
const data = Utils.mock(5)
  .circle()
  .graphin();

data.edges = [];

console.log(data);

const layout = {
  type: 'concentric',
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled />
        <Hoverable bindType="node" />
        {/* <EventCenter /> */}
      </Graphin>
    </div>
  );
};
