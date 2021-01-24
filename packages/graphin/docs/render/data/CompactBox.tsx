import React, { useEffect } from 'react';

import Grahpin, { GraphinContext, Behaviors } from '@antv/graphin';

const { TreeCollapse } = Behaviors;
// let graphinRef = null;
const FocusItem = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    graph.focusItem('Modeling Methods', true);
    graph.setItemState('Modeling Methods', 'selected', true);
  }, []);
  return null;
};

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

const CompactBox = () => {
  const [state, setState] = React.useState({
    data: null,
  });
  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then((res) => res.json())
      .then((res) => {
        console.log('data', res);
        setState({
          data: res,
        });
      });
  }, []);

  const { data } = state;

  return (
    <div>
      {data && (
        <Grahpin
          data={data}
          // ref={node => {
          //   graphinRef = node;
          // }}
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
          <FocusItem />
        </Grahpin>
      )}
    </div>
  );
};

export default CompactBox;
