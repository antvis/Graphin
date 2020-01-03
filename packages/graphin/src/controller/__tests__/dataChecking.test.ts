import dataChecking from '../layout/dataChecking';

// eslint-disable-next-line
const nodeIdErrorInput: any = {
  nodes: [
    {
      data: {}, // id missing
    },
    {
      id: null, // id null
      data: {},
    },
    {
      id: undefined, // id undefined
      data: {},
    },
  ],
  edges: [],
};

// eslint-disable-next-line
const nodeDataErrorInput: any = {
  nodes: [
    {
      id: '1',
      data: undefined, // data  undefined
    },
    {
      id: '2',
      data: null, // data null
    },
    {
      id: '3', // data missing
    },
  ],
  edges: [],
};

// eslint-disable-next-line
const nodeIdDupInput: any = {
  nodes: [
    {
      id: '1',
      data: {},
    },
    {
      id: '1',
      data: {},
    },
  ],
  edges: [],
};

// eslint-disable-next-line
const edgeErrorInput: any = {
  nodes: [],
  edges: [
    {},
    { source: null, data: {} },
    { source: undefined, data: {} },
    { source: '1', data: {} },
    { target: '2', data: {} },
    { target: null, data: {} },
    { target: undefined, data: {} },
    { source: '1', target: '2' },
    { source: '1', target: '2', data: null },
    { source: '1', target: '2', data: undefined },
    { source: null, target: null },
    { source: undefined, target: undefined },
  ],
};

// eslint-disable-next-line
const edgeDupInput: any = {
  nodes: [],
  edges: [{ source: '1', target: '2', data: {} }, { source: '1', target: '2', data: {} }],
};

// eslint-disable-next-line
const noopInput: any = {};

describe('DataChecking', () => {
  it('should skip node when node id is missing or null', () => {
    expect(dataChecking(nodeIdErrorInput).nodes.length).toBe(0);
  });
  it('should skip node when node data is missing or null', () => {
    expect(dataChecking(nodeDataErrorInput).nodes.length).toBe(0);
  });

  it('should skip node when node id is duplicated', () => {
    expect(dataChecking(nodeIdDupInput).nodes.length).toBe(1);
  });

  it('should skip edge when source/target/data is missing or null', () => {
    expect(dataChecking(edgeErrorInput).edges.length).toBe(0);
  });

  it('should reserve edge when source/target is duplicated', () => {
    expect(dataChecking(edgeDupInput).edges.length).toBe(2);
  });

  it('should return empty result when input noop', () => {
    expect(dataChecking(noopInput).edges.length).toBe(0);
    expect(dataChecking(noopInput).nodes.length).toBe(0);
    expect(dataChecking().nodes.length).toBe(0);
    expect(dataChecking().edges.length).toBe(0);
  });

  // TODO
  // it('should skip edge when source or target is not found in nodes', () => {

  // });
});
