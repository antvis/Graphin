import EventEmitter from 'eventemitter3';
import dragWithForce from '../drag-with-force';

describe('Drag with force event', () => {
  const mockRestart = jest.fn();
  const mockStop = jest.fn();
  const mockRefreshPositions = jest.fn();
  const getMockGraphin = () => {
    const mockGraphin: any = {}; // eslint-disable-line
    mockGraphin.graph = new EventEmitter();
    mockGraphin.graph.refreshPositions = mockRefreshPositions;
    mockGraphin.g6Options = {};
    mockGraphin.state = {
      forceSimulation: {
        restart: mockRestart,
        stop: mockStop,
      },
    };
    return mockGraphin;
  };

  it('Should stop and restart forcesimulation when drag start and end', () => {
    const graphin = getMockGraphin();
    const { graph } = graphin;
    dragWithForce(graphin);
    graph.emit('node:dragstart');
    expect(mockStop).toBeCalled();

    const nodeModel = {
      layout: {},
    };
    // eslint-disable-next-line
    const item: any = {
      // eslint-disable-next-line
      get: (k: any) => {
        return item[k];
      },
      model: nodeModel,
    };

    graph.emit('node:dragend', { item, x: 0, y: 0 });
    expect(mockRestart).toBeCalled();
    // Object.assign({}, nodeModel, {
    //     layout: {
    //         force: {
    //             mass: 1000000,
    //         },
    //     },
    // }),

    expect(mockRefreshPositions).toBeCalled();
  });
});
