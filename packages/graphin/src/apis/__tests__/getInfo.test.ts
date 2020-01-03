import getInfo from '../getInfo';

// eslint-disable-next-line
const MockGraph: any = {
  nodes: [{ id: 1 }, { id: '2' }],
  edges: [{ source: { id: '1' }, target: { id: '2' } }],
  // eslint-disable-next-line
  get: (k: any) => {
    return MockGraph[k];
  },
};

describe('Get info  API', () => {
  it('Should return right count result', () => {
    expect(getInfo(MockGraph)()).toEqual({
      count: {
        nodes: 2,
        edges: 1,
      },
    });
  });
});
