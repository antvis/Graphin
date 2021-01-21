import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import { Row, Col } from 'antd';

const { ZoomCanvas } = Behaviors;

const EventCenter = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    // graph.on('edge:mouseenter', evt => {
    //   graph.setItemState(evt.item, 'selected', true);
    // });

    // graph.on('edge:mouseleave', evt => {
    //   graph.setItemState(evt.item, 'selected', false);
    // });

    graph.on('edge:click', evt => {
      graph.setItemState(evt.item, 'selected', true);
    });
  }, []);

  return null;
};

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

data.edges.forEach(edge => {
  edge.type = 'graphin-edge';
  edge.id = `${Math.random()}`;
  edge.style = {
    label: {
      value: `${edge.source} - ${edge.target} `,
    },
  };
});

data.edges = [];
/** 第二条边:虚线 */

data.edges = [
  {
    type: 'graphin-line',
    source: 'node-0',
    target: 'node-1',
    style: {
      keyshape: {
        lineDash: [5, 5],
        stroke: 'green',
      },
    },
  },
  {
    type: 'graphin-line',
    source: 'node-0',
    target: 'node-5',
    style: {
      keyshape: {
        lineWidth: 4,
        stroke: 'grey',
      },
    },
  },
  {
    type: 'graphin-line',
    source: 'node-0',
    target: 'node-4',
    style: {
      keyshape: {
        lineWidth: 2,
        stroke: 'grey',
      },
    },
  },
  {
    type: 'arc',
    source: 'node-0',
    target: 'node-6',
    style: {},
  },
];

console.log(data);
export default () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Graphin
            data={data}
            layout={layout}
            // defaultEdge={defaultEdge}
            // edgeStateStyles={edgeStateStyles}
          >
            <ZoomCanvas />
            <EventCenter />
          </Graphin>
        </Col>
        <Col span={12}>
          <Graphin
            theme={{ mode: 'dark' }}
            data={data}
            layout={layout}
            // defaultEdge={defaultEdge}
            // edgeStateStyles={edgeStateStyles}
          >
            <ZoomCanvas />
            <EventCenter />
          </Graphin>
        </Col>
      </Row>
    </div>
  );
};
