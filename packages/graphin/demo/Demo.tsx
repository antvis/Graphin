import React, { useLayoutEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Graphin, { GraphinContext } from '../src';
import cloneDeep from 'lodash/cloneDeep';

const defaultEdge = {
  style: {
    keyshape: {
      stroke: 'green',
      strokeOpacity: 1,
      fillOpacity: 1,
      opacity: 1,
      cursor: 'pointer',
      shadowColor: 'transparent',
      lineAppendWidth: 9,
    },
  },
};

const edgeStateStyles = {
  status: {
    selected: {
      keyshape: {
        stroke: '#ddd',
      },
    },
    inactive: {
      keyshape: {
        opactiy: 0.5,
      },
    },
  },
};

const Logger = () => {
  const { graph } = useContext(GraphinContext);
  const onEdgeClick = (e): void => {
    const { item } = e;
    console.log(item._cfg.keyShape.attrs);
  };

  useLayoutEffect(() => {
    graph.on('edge:click', onEdgeClick);

    return (): void => {
      graph.off('edge:click', onEdgeClick);
    };
  }, [graph]);

  return null;
};

const nodes = [
  {
    id: 'node-0',
    x: 100,
    y: 200,
  },
  {
    id: 'node-1',
    x: 600,
    y: 200,
  },
];

const edges = [
  {
    id: 'edge-0',
    source: 'node-0',
    target: 'node-1',
    style: {
      keyshape: {
        lineWidth: 2,
        type: 'poly',
        poly: {
          distance: 40,
        },
      },
    },
  },
];

const layout = {
  type: 'preset',
};

const data = { nodes, edges };

const Demo = () => {
  const [count, setCount] = useState(0);
  const genData = () => {
    const newData = cloneDeep(data);
    newData.edges[0].style = {
      keyshape: {
        stroke: 'black',
        lineWidth: 10,
        type: 'poly',
        poly: {
          distance: 40,
        },
      },
    };
    return newData;
  };
  return (
    <div>
      <button onClick={() => setCount(1)}>Update Edge</button>
      <Graphin
        defaultEdge={defaultEdge}
        edgeStateStyles={edgeStateStyles}
        data={count === 0 ? data : genData()}
        layout={layout}
      >
        <Logger />
      </Graphin>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById('root'));
