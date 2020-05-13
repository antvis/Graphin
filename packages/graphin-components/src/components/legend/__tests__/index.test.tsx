import React from 'react';
import Graphin from '@antv/graphin/src/Graphin';
import { render, act, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Legend, { LegendProps, LegendOption } from '../index';

describe('<Legend />', () => {
  it('You shall pass', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'force',
    };
    const options: LegendOption[] = [
      {
        label: '人群',
        value: 'person',
        color: 'red',
      },
      {
        label: '公司',
        value: 'company',
        color: 'blue',
      },
    ];

    const { asFragment, queryAllByTestId } = render(
      <Graphin data={data} layout={layout}>
        <Legend options={options} onChange={() => {}} />
      </Graphin>,
    );
  });
});
