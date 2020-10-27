/* import React from 'react';
import { render } from '@testing-library/react';
import Graphin from '@antv/graphin'; */
import '@testing-library/jest-dom/extend-expect';
import { Graph } from '@antv/g6';

// import Toolbar from '../index';

describe('<Toolbar />', () => {
  it('You shall pass', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'force',
    };
    const graph = {} as Graph;

    /* render(
      <Graphin data={data} layout={layout}>
        <Toolbar graph={graph} style={{ position: 'fixed', right: 68, top: 68 }} />
      </Graphin>,
    ); */
  });
});
