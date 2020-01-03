/* eslint-disable */
export const SAMPLE_DATA = {
  nodes: [
    {
      id: 'foo',
      data: {
        id: 'foo',
      },
    },
    {
      id: 'foo1',
      data: {
        id: 'foo1',
      },
    },
    {
      id: 'foo2',
      data: {
        id: 'foo2',
      },
    },
    {
      id: 'foo3',
      data: {
        id: 'foo3',
      },
    },
  ],
  edges: [
    {
      source: 'foo1',
      target: 'foo2',
      data: {},
    },
  ],
};

export const SAMPLE_DATA_1 = {
  nodes: [
    {
      id: 'foo',
      data: {
        id: 'foo',
      },
    },
    {
      id: 'foo1',
      data: {
        id: 'foo1',
      },
    },
    {
      id: 'foo2',
      data: {
        id: 'foo2',
      },
    },
    {
      id: 'foo3',
      data: {
        id: 'foo3',
      },
    },
    {
      id: 'foo4',
      data: {
        id: 'foo3',
      },
    },
  ],
  edges: [],
};

export const SAMPLE_DATA_2 = {
  nodes: [
    {
      id: 'foo',
      data: {
        id: 'foo',
      },
    },
    {
      id: 'foo1',
      data: {
        id: 'foo1',
      },
    },
    {
      id: 'foo2',
      data: {
        id: 'foo2',
      },
    },
    {
      id: 'foo3',
      data: {
        id: 'foo3',
      },
    },
  ],
  edges: [
    {
      source: 'foo1',
      target: 'foo2',
      data: {},
    },
    {
      source: 'foo1',
      target: 'foo',
      data: {},
    },
    {
      source: 'foo1',
      target: 'foo3',
      data: {},
    },
  ],
};
