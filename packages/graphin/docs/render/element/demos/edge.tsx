import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;

const EventCenter = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.on('node:mouseenter', evt => {
      graph.setItemState(evt.item, 'hover', true);
    });

    graph.on('node:mouseleave', evt => {
      graph.setItemState(evt.item, 'hover', false);
    });

    graph.on('edge:mouseenter', evt => {
      graph.setItemState(evt.item, 'selected', true);
    });

    graph.on('edge:mouseleave', evt => {
      graph.setItemState(evt.item, 'selected', false);
    });
  }, []);

  return null;
};

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'circular',
};

const defaultEdge = {
  style: {
    stroke: '#000',
  },
  status: {
    selected: {
      stroke: 'red',
      animation: {
        repeat: true,
      },
    },
  },
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} defaultEdge={defaultEdge}>
        <ZoomCanvas />
        <EventCenter />
      </Graphin>
    </div>
  );
};
