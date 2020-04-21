import mock from '../mock';

describe('Mock Util', () => {
  it('Should return result that match snapshot', () => {
    expect(
      mock(10)
        .type('company')
        .value(),
    ).toMatchSnapshot();
    expect(
      mock(10)
        .circle('node-1')
        .value(),
    ).toMatchSnapshot();
    expect(
      mock(10)
        .circle('node-foo')
        .value(),
    ).toMatchSnapshot();
    expect(mock(10).graphin()).toMatchSnapshot();
    // eslint-disable-next-line
    expect(
      mock(10)
        .type('company')
        .random(0.5)
        .value().nodes.length === 10,
    ).toBeTruthy;
    // eslint-disable-next-line
    expect(
      mock(10)
        .type('company')
        .random(0.5)
        .value().edges.length === 10,
    ).toBeTruthy;
  });
});
