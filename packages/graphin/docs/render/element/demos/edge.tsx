import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

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
      graph.updateItem(evt.item, {
        keyshape: {
          lineWidth: 15,
          stroke: 'red',
        },
      });
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

// const edgeStateStyles = {
//   status: {
//     selected: {
//       stroke: 'red',
//       animation: {
//         repeat: true,
//       },
//     },
//   },
// };

// const defaultEdge = {
//   type: 'graphin-edge',
//   style: {
//     keyshape: {
//       stroke: '#000',
//       lineWidth: 2,
//     },
//     status: {
//       selected: {
//         halo: {
//           visible: true,
//         },
//         keyshape: {
//           stroke: '#1890ff',
//           opacity: 1,
//         },
//       },
//       hover: {
//         halo: {
//           visible: true,
//         },
//       },
//     },
//   },
// };

data.edges.forEach(edge => {
  edge.type = 'graphin-edge';
  edge.style = {
    label: {
      value: `${edge.source} - ${edge.target} `,
    },
  };
});
export default () => {
  return (
    <div>
      <Graphin
        data={data}
        layout={layout}
        // defaultEdge={defaultEdge}
        // edgeStateStyles={edgeStateStyles}
      >
        <ZoomCanvas />
        <EventCenter />
      </Graphin>
    </div>
  );
};
