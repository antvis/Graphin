import React from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import G6 from '@antv/g6';

import CustomMenu from './CustomMenu';
import { icons } from './utils';

const layout = {
  type: 'graphin-force',
  animation: true,
};

/** Graphin */
const { ZoomCanvas, DragNode } = Behaviors;

/** G6 */
const { louvain } = G6.Algorithm;
const { uniqueId } = G6.Util;

const AlibabaColor = '#FF6A00';

const nodeMap = {};
const aggregatedNodeMap = {};

/** 转化函数 */
const transClusterData = (data, sourceData) => {
  const nodes = data.clusters.map(node => {
    const clusterNode = {
      ...node,
      type: 'graphin-circle',
      style: {
        fill: AlibabaColor,
        strokeWidth: 2,
        stroke: AlibabaColor,
        size: [30, 30],
        label: {
          value: `ID:${node.id}  count:${node.nodes.length}`,
        },
        icon: {
          fontFamily: 'graphin',
          type: 'font',
          value: icons.plus,
          fill: '#fff',
          size: 20,
        },
        badges: [
          {
            position: 'RT',
            type: 'text',
            value: node.nodes.length,
            size: [14, 14],
            fill: AlibabaColor,
            stroke: AlibabaColor,
            color: '#fff',
            fontSize: 12,
            padding: 0,
            offset: [0, 0],
          },
        ],
      },
    };

    aggregatedNodeMap[node.id] = clusterNode;
    return clusterNode;
  });

  const edges = data.clusterEdges.map(edge => {
    return {
      ...edge,
      size: Math.log(edge.count),
      label: '',
      id: `edge-${uniqueId()}`,
    };
  });

  sourceData.nodes.forEach(node => {
    nodeMap[node.id] = node;
  });

  return {
    nodes,
    edges,
  };
};

const App = () => {
  const [state, setState] = React.useState({
    data: {},
    source: {},
    clusteredData: {},
  });
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then(res => res.json())
      .then(res => {
        const clusteredData = louvain(res, false, 'weight');
        setState({
          source: res,
          data: transClusterData(clusteredData, res),
          clusteredData,
        });
      });
  }, []);

  const { data } = state;

  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <ContextMenu>
          <CustomMenu state={state} updateState={setState} nodeMap={nodeMap} aggregatedNodeMap={aggregatedNodeMap} />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
