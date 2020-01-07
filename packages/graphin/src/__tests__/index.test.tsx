/* eslint-disable */
import React, { Fragment } from 'react';
import { render, act, fireEvent, waitForElement, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Graphin from '../Graphin';
import { Data } from '../types';
import { SAMPLE_DATA, SAMPLE_DATA_1, SAMPLE_DATA_2 } from './data';
import { getCanvasEventCount, getCanvasPathCount, wait } from './helper';
import mock from '../utils/mock';

const TIMEOUT = 60 * 1000;

const MockComponent = (props: any) => {
  if (!props.graph) {
    return null;
  }
  return <div>ComponentWithProps</div>;
};

const AnotherMockComponent = (props: any) => {
  if (!props.graph) {
    return <div>ComponentWithoutProps</div>;
  }
  return <div>AnotherMockComponent</div>;
};

describe('<Graphin />', () => {
  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  it('should renders all kinds of children correctly', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'grid',
    };
    const options = {
      disablePan: true,
      disableDrag: true,
      disableZoom: true,
      pan: { x: 10, y: 10 },
    };

    const { asFragment, queryByText, rerender } = render(
      <Graphin data={data} options={options} layout={layout}>
        <div>foo</div>text <MockComponent />
        <Fragment>
          <AnotherMockComponent />
        </Fragment>
      </Graphin>,
    );

    // Text, DOM element, React Component, Fragment should be handled
    expect(queryByText(/foo/)).toBeTruthy();
    expect(queryByText(/text/)).toBeTruthy();
    expect(queryByText(/ComponentWithProps/)).toBeTruthy();
    expect(queryByText(/ComponentWithoutProps/)).toBeTruthy();
  });

  it('should renders single element child correctly', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'grid',
    };

    const { queryByText } = render(
      <Graphin data={data} layout={layout}>
        <MockComponent />
      </Graphin>,
    );

    expect(queryByText(/ComponentWithProps/)).toBeTruthy();
  });

  it('should handles render function', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'grid',
    };

    const { queryByText } = render(
      <Graphin data={data} layout={layout}>
        {(props: any) => {
          return <MockComponent {...props} />;
        }}
      </Graphin>,
    );

    expect(queryByText(/ComponentWithProps/)).toBeTruthy();
  });

  it('should handles empty child correctly', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'grid',
    };

    const { asFragment } = render(<Graphin data={data} layout={layout} />);

    expect(asFragment().children.length).toBe(2);
  });

  it(
    'should rerender g6 when node change',
    async () => {
      let data: Data = {
        nodes: [],
        edges: [],
      };

      const layout = {
        name: 'circle',
      };

      const { getByTestId, rerender } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      // Draw Canvas need some time
      await wait();

      const prevEventsCount = getCanvasEventCount(getByTestId);

      rerender(
        <Graphin
          data={mock(10)
            .circle()
            .graphin()}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should rerender g6 when layout change',
    async () => {
      const data: Data = Object.assign({}, SAMPLE_DATA_2);

      let layout = {
        name: 'grid',
      };

      const { getByTestId, rerender } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      /** Circle Layout */
      layout = {
        name: 'circle',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      /** Dagre Layout */
      layout = {
        name: 'dagre',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      /** Radial Layout */
      layout = {
        name: 'radial',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      /** Concentric Layout */
      layout = {
        name: 'concentric',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      /** Grid Layout */
      layout = {
        name: 'grid',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      /** Force Layout */
      layout = {
        name: 'force',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait(500);
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      // test force as a pre layout
      layout = {
        name: 'grid',
      };

      act(() => {
        rerender(<Graphin data={data} layout={layout} />);
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should not rerender g6 when layout reference change without value change',
    async () => {
      const data: Data = Object.assign({}, SAMPLE_DATA_2);

      const { getByTestId, rerender } = render(
        <Graphin
          data={data}
          layout={{
            name: 'grid',
          }}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        rerender(
          <Graphin
            data={data}
            layout={{
              name: 'grid',
            }}
          />,
        );
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) === prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should have default value for layout',
    async () => {
      const data: Data = Object.assign({}, SAMPLE_DATA_2);

      const { getByTestId, rerender } = render(
        <Graphin
          data={data}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      await wait();
      const prevCount = getCanvasEventCount(getByTestId);
      expect(prevCount > 0).toBeTruthy();

      rerender(
        <Graphin
          data={data}
          layout={{
            name: 'foo',
          }}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        />,
      );

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should clear canvas when call clear',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA);
      const layout = {
        name: 'grid',
      };

      const MockComponent = (props: any) => {
        return (
          <div
            onClick={() => {
              console.log('clear called');
              props.apis.clear();
            }}
          >
            Click Me
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Click Me/), {});
      });

      await wait();

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should undo/redo history correctly',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA);
      const layout = {
        name: 'grid',
      };

      const MockComponent = (props: any) => {
        return (
          <div>
            <div
              onClick={() => {
                console.log('undo called');
                props.apis.history.undo();
              }}
            >
              Undo
            </div>
            <div
              onClick={() => {
                console.log('redo called');
                props.apis.history.redo();
              }}
            >
              Redo
            </div>
          </div>
        );
      };

      const { getByText, getByTestId, rerender } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      await wait();
      let prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Undo/), {});
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) === prevEventsCount).toBeTruthy();

      act(() => {
        fireEvent.click(getByText(/Redo/), {});
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) === prevEventsCount).toBeTruthy();

      data = Object.assign({}, SAMPLE_DATA_1);

      rerender(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      await wait();
      prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Undo/), {});
      });

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      act(() => {
        fireEvent.click(getByText(/Redo/), {});
      });

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should handle hightLight event',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA);
      const layout = {
        name: 'grid',
      };

      const MockComponent = (props: any) => {
        return (
          <div
            onClick={() => {
              props.apis.highlight(['foo']);
            }}
          >
            Click Me
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Click Me/), {});
      });

      await wait();

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();
    },
    TIMEOUT,
  );

  it(
    'should handle other apis',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA);
      const layout = {
        name: 'grid',
      };

      let searchResult = [];
      let info = {};

      const MockComponent = (props: any) => {
        return (
          <div
            onClick={() => {
              searchResult = props.apis.search('foo1');
              info = props.apis.getInfo();
            }}
          >
            Click Me
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      await wait();

      act(() => {
        fireEvent.click(getByText(/Click Me/), {});
      });

      await wait();

      expect(searchResult.length).toEqual(1);
    },
    TIMEOUT,
  );

  it(
    'should handle zoom event',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA_2);
      const layout = {
        name: 'force',
      };

      const MockComponent = (props: any) => {
        return (
          <div>
            <div
              onClick={() => {
                props.graph.zoomTo(0.5, { x: 100, y: 100 });
              }}
            >
              zoom1
            </div>
            <div
              onClick={() => {
                props.graph.zoomTo(0.7, { x: 10, y: 10 });
              }}
            >
              zoom2
            </div>
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      // await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/zoom1/), {});
        fireEvent.click(getByText(/zoom2/), {});
      });

      await wait();

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      act(() => {
        // Change the viewport to 500px.
        (window as any).innerWidth = 500;
        (window as any).innerHeight = 500;
      });
      fireEvent(window, new Event('resize'));

      await wait();
    },
    TIMEOUT,
  );

  it(
    'should handle node & edge & canvas click behavior',
    async () => {
      let data: Data = Object.assign({}, SAMPLE_DATA);
      const layout = {
        name: 'grid',
      };

      const MockComponent = (props: any) => {
        return (
          <div>
            <div
              onClick={() => {
                props.graph.emit('node:click', {
                  item: props.graph._cfg.nodes[0],
                });
                props.graph.emit('edge:click', {
                  item: props.graph._cfg.edges[0],
                });
                props.graph.emit('edge:click', {
                  item: props.graph._cfg.edges[0],
                });
                props.graph.emit('canvas:click', {
                  item: props.graph._cfg.edges[0],
                });
              }}
            >
              Click Me
            </div>
            <div
              onClick={() => {
                props.graph.emit('keydown', {
                  key: 'control',
                  keyCode: 18,
                });
              }}
            >
              KeydownWith18
            </div>
            <div
              onClick={() => {
                props.graph.emit('keyup', {});
              }}
            >
              Keyup
            </div>
            <div
              onClick={() => {
                props.graph.emit('keydown', {
                  key: 'control',
                  which: 17,
                });
              }}
            >
              KeydownWith17
            </div>
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      await wait();
      const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Click Me/), {});
      });

      await wait();

      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      act(() => {
        fireEvent.click(getByText(/KeydownWith18/), {});
      });

      await wait();

      act(() => {
        fireEvent.click(getByText(/Click Me/), {});
      });

      await wait();
      expect(getCanvasEventCount(getByTestId) > prevEventsCount).toBeTruthy();

      act(() => {
        fireEvent.click(getByText(/Keyup/), {});
        fireEvent.click(getByText(/KeydownWith17/), {});
      });
    },
    TIMEOUT,
  );

  it(
    'should stop and restart force simulation correctly',
    async () => {
      const data: Data = mock(10).graphin();

      let layout = {
        name: 'force',
      };

      const MockComponent = (props: any) => {
        return (
          <div>
            <div
              onClick={() => {
                if (props.graphVars.forceSimulation) props.graphVars.forceSimulation.stop();
              }}
            >
              Stop
            </div>
            <div
              onClick={() => {
                if (props.graphVars.forceSimulation) {
                  props.graphVars.forceSimulation.restart(props.graph.save().nodes, props.graph);
                }
              }}
            >
              Restart
            </div>
          </div>
        );
      };

      const { getByText, getByTestId } = render(
        <Graphin
          data={data}
          layout={layout}
          options={{
            animate: false,
            animateCfg: {
              duration: 0,
            },
          }}
        >
          <MockComponent />
        </Graphin>,
      );

      // Draw Canvas need some time
      await wait();
      // const prevEventsCount = getCanvasEventCount(getByTestId);

      act(() => {
        fireEvent.click(getByText(/Stop/), {});
      });

      await wait();

      act(() => {
        fireEvent.click(getByText(/Restart/), {});
      });
    },
    TIMEOUT,
  );
});
