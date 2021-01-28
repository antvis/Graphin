import React, { useEffect } from 'react';

import Grahpin, { GraphinContext, Behaviors } from '@antv/graphin';

const { TreeCollapse } = Behaviors;
let graphinRef = null;

// const FitView = () => {
//   const { graph } = React.useContext(GraphinContext);
//   useEffect(() => {
//     setTimeout(() => {
//       console.log('fitView');
//       graph.fitView();
//     }, 16);
//   }, []);
//   return null;
// };

const walk = (node, callback) => {
  callback(node);
  if (node.children && node.children.length !== 0) {
    node.children.forEach(n => {
      walk(n, callback);
    });
  }
};
const CompactBox = () => {
  const [state, setState] = React.useState({
    data: null,
  });
  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then(res => {
        console.log('data', res);
        walk(res, node => {
          node.style = {
            label: {
              value: node.id, // add label
            },
          };
        });
        setState({
          data: res,
        });
      });
  }, []);

  // useEffect(() => {
  //   if (graphinRef) {
  //     graphinRef.graph.on('afterlayout', () => {
  //       graphinRef.graph.fitView();
  //     });
  //   }
  // }, [graphinRef, state.data]);

  const { data } = state;

  return (
    <div>
      {data && (
        <Grahpin
          data={data}
          // handleAfterLayout={handleAfterLayout}
          ref={node => {
            graphinRef = node;
          }}
          fitView
          layout={{
            type: 'compactBox',
            direction: 'TB',
            getId: function getId(d) {
              return d.id;
            },
            getHeight: function getHeight() {
              return 16;
            },
            getWidth: function getWidth() {
              return 16;
            },
            getVGap: function getVGap() {
              return 80;
            },
            getHGap: function getHGap() {
              return 50;
            },
          }}
        >
          {/* <FitView /> */}
          <TreeCollapse trigger="click" />
          {/* <FocusItem /> */}
        </Grahpin>
      )}
    </div>
  );
};

export default CompactBox;
