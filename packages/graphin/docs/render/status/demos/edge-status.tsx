import Graphin, { GraphinContext } from '@antv/graphin';
import React, { useContext } from 'react';
import './index.less';

const ShowPaths = ({ paths = [] }) => {
  const { graph } = useContext(GraphinContext);
  const nodes = graph.getNodes();
  const edges = graph.getEdges();

  function handleShowPath(path) {
    nodes.forEach(node => {
      const model = node.getModel();
      if (!path.nodes.includes(model.id)) {
        graph.setItemState(node, 'inactive', true);
      }
    });
    edges.forEach(edge => {
      const model = edge.getModel();
      if (!path.edges.includes(model.id)) {
        graph.setItemState(edge, 'inactive', true);
      } else {
        graph.setItemState(edge, 'active', true);
      }
    });
  }
  function handleClear(path) {
    nodes.forEach(node => {
      const model = node.getModel();
      if (!path.nodes.includes(model.id)) {
        graph.setItemState(node, 'inactive', false);
      }
    });
    edges.forEach(edge => {
      const model = edge.getModel();
      if (!path.edges.includes(model.id)) {
        graph.setItemState(edge, 'inactive', false);
      } else {
        graph.setItemState(edge, 'active', false);
      }
    });
  }

  return (
    <div style={{ position: 'absolute', top: 5 }}>
      <ul className="status-ul">
        <h3>node-0 到 node-4 的路径</h3>

        {paths.map((path, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} onMouseEnter={() => handleShowPath(path)} onMouseLeave={() => handleClear(path)}>
              路径-{index + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const data = {
  nodes: [
    {
      id: 'node-0',
      label: 'node-0',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-0',
        },
      },
    },
    {
      id: 'node-1',
      label: 'node-1',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-1',
        },
      },
    },
    {
      id: 'node-2',
      label: 'node-2',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-2',
        },
      },
    },
    {
      id: 'node-3',
      label: 'node-3',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-3',
        },
      },
    },
    {
      id: 'node-4',
      label: 'node-4',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-4',
        },
      },
    },
    {
      id: 'node-5',
      label: 'node-5',
      type: 'graphin-circle',
      style: {
        label: {
          value: 'node-5',
        },
      },
    },
  ],
  edges: [
    { source: 'node-0', target: 'node-1', id: 'edge1' },
    { source: 'node-0', target: 'node-2', id: 'edge2' },
    { source: 'node-1', target: 'node-3', id: 'edge3' },
    { source: 'node-2', target: 'node-3', id: 'edge4' },
    { source: 'node-3', target: 'node-4', id: 'edge5' },
  ],
};
const paths = [
  { edges: ['edge1', 'edge3', 'edge5'], nodes: ['node-0', 'node-1', 'node-3', 'node-4'] },
  { edges: ['edge2', 'edge4', 'edge5'], nodes: ['node-0', 'node-2', 'node-3', 'node-4'] },
];

export default () => {
  return (
    <div>
      <Graphin data={data} layout={{ type: 'graphin-force' }}>
        <ShowPaths paths={paths} />
      </Graphin>
    </div>
  );
};
