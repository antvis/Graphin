import { Graph } from '@antv/g6';
import search from '../search';

const MockGraph = {
  save: () => {
    return {
      nodes: [
        {
          id: '1',
          data: {
            id: '1',
            label: 'bar',
            properties: [
              {
                value: 'foo',
              },
            ],
          },
        },
      ],
    };
  },
};

describe('Search API', () => {
  it('Should return right search result by id', () => {
    const result = search(MockGraph as Graph)('1');
    expect(result[0].id === '1').toBeTruthy();
    expect(result[0].searchTypes!.indexOf('id') > -1).toBeTruthy();
  });

  it('Should return right search result by label', () => {
    const result = search(MockGraph as Graph)('bar');
    expect(result[0].id === '1').toBeTruthy();
    expect(result[0].searchTypes!.indexOf('label') > -1).toBeTruthy();
  });

  it('Should return right search result by properties', () => {
    const result = search(MockGraph as Graph)('foo');
    expect(result[0].id === '1').toBeTruthy();
    expect(result[0].searchTypes!.indexOf('property') > -1).toBeTruthy();
  });

  it('Should return empty search result when not found', () => {
    const result = search(MockGraph as Graph)();
    expect(result.length === 0).toBeTruthy();
  });
});
