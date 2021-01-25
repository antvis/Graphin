import React from 'react';
import Graphin, { Utils, G6 } from '@antv/graphin';
import { EdgeBundling } from '@antv/graphin-components';

// Do not forget to import CSS

const data = Utils.mock(5).graphin();
const { edges } = data;
data.edges = [
  ...edges.map((edge) => {
    return {
      ...edge,
      // label: Math.random(),
    };
  }),
  ...edges.map((edge) => {
    return {
      ...edge,
      // label: Math.random() * 2,
    };
  }),
  ...edges.map((edge) => {
    return {
      ...edge,
      // label: Math.random() * 5,
    };
  }),
  ...edges.map((edge) => {
    return {
      ...edge,
      // label: Math.random() * 10,
    };
  }),
];

G6.Util.processParallelEdges(data.edges);

console.log('edge', data.edges);
const App = () => {
  return (
    <div className="App">
      <Graphin
        data={data}
        layout={{ type: 'circle' }}
        defaultEdge={{
          type: 'quadratic',
          labelCfg: {
            autoRotate: true,
          },
        }}
      >
        <EdgeBundling />
      </Graphin>
    </div>
  );
};
export default App;
