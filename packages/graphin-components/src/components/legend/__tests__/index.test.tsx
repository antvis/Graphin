import React, { useState, useEffect } from 'react';
import Graphin from '@antv/graphin/src/Graphin';
import { render, screen, waitForDomChange, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Legend, { LegendOption } from '../index';

const onChangeMock = jest.fn();

const MockComponent = (props: { options: LegendOption[] }) => {
  const { options: propOptions } = props;
  const [options, setOptions] = useState<LegendOption[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setOptions(propOptions);
    }, 3000);
  }, [propOptions]);

  return <Legend options={options} onChange={onChangeMock} />;
};

describe('<Legend />', () => {
  it('Legend should render correctly', () => {
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

    render(
      <Graphin data={data} layout={layout}>
        <Legend options={options} onChange={() => {}} />
      </Graphin>,
    );

    expect(screen.getByText('人群')).toBeInTheDocument();
    expect(screen.getByText('公司')).toBeInTheDocument();
  });

  it('Legend should update on props update', async () => {
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

    const { container } = render(<MockComponent options={options} />);

    expect(screen.queryByText('人群')).toBeNull();

    expect(screen.queryByText('公司')).toBeNull();

    await waitForDomChange({ container });
    expect(screen.getByText('人群')).toBeInTheDocument();
    expect(screen.getByText('公司')).toBeInTheDocument();
  });

  it('OnChange should be fired correctly on legend click', async () => {
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

    const { container } = render(<MockComponent options={options} />);

    await waitForDomChange({ container });
    fireEvent.click(screen.getByText('人群'));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(screen.getByText('人群'));

    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
