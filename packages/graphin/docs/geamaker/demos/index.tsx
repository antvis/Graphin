import React from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { ContextMenu, FishEye, MiniMap } from '@antv/graphin-components';
import G6 from '@antv/g6';
import { colorSets, clusterColorMap } from './color';
import hexToRgba from '../../../src/utils/hexToRgba';

import CustomMenu from './CustomMenu';
import { icons } from './utils';

const { Menu } = ContextMenu;

console.log('colorSets', colorSets);
const layout = {
  type: 'graphin-force',
  animation: true,
  preset: {
    type: 'concentric',
    linkDistance: 400, // 可选，边长
    preventOverlap: true, // 可选，必须配合 nodeSize
    nodeSize: 60,
  },
};

/** Graphin */
const { ZoomCanvas, DragNode } = Behaviors;

/** G6 */
const { louvain } = G6.Algorithm;
const { uniqueId } = G6.Util;

const nodeMap = {};
const aggregatedNodeMap = {};
const nodeSize = 40;
const badgeSize = 12;

/** 转化函数 */
const transClusterData = (data, sourceData) => {
  const nodes = data.clusters.map((node, index) => {
    const primaryColor = colorSets[index].mainFill;
    clusterColorMap.set(node.id, primaryColor);

    const clusterNode = {
      ...node,
      type: 'graphin-circle',
      style: {
        fill: hexToRgba(primaryColor, 0.1), // '#fff',
        strokeWidth: 1.2,
        stroke: primaryColor,
        size: [nodeSize, nodeSize],
        label: {
          value: `cluster-${node.id}(${node.nodes.length})`,
          fill: hexToRgba('#000', '0.85'),
        },
        icon: {
          fontFamily: 'graphin',
          type: 'font',
          value: icons.team,
          fill: primaryColor,
          size: nodeSize / 1.6,
        },
        badges: [
          {
            position: 'RT',
            type: 'text',
            value: node.nodes.length,
            size: [badgeSize, badgeSize],
            fill: primaryColor,
            stroke: primaryColor,
            color: '#fff',
            fontSize: badgeSize * 0.8,
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
    const size = Math.log(edge.count) || 0.5;
    const id = `edge-${uniqueId()}`;
    return {
      ...edge,
      id,
      label: '',
      size: size > 0.5 ? size : 0.5,
      color: '#AAB7C4', // '#545872',
      style: {
        // endArrow: {
        //   path: 'M 0,0 L 8,4 L 8,-4 Z',
        //   fill: '#545872',
        // },
      },
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
let refreshData;
const App = () => {
  const [state, setState] = React.useState({
    data: {},
    source: {},
    clusteredData: {},
    visible: false,
  });
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then(res => res.json())
      .then(res => {
        const clusteredData = louvain(res, false, 'weight');

        const data = transClusterData(clusteredData, res);
        refreshData = data;
        setState(preState => {
          return {
            ...preState,
            data,
            source: res,
            clusteredData,
          };
        });
      });
  }, []);

  const { data, visible } = state;
  const handleClose = () => {
    setState(preState => {
      return {
        ...preState,
        visible: false,
      };
    });
  };
  const handleOpen = () => {
    setState(preState => {
      return {
        ...preState,
        visible: true,
      };
    });
  };
  const handleRefresh = () => {
    setState(preState => {
      return {
        ...preState,
        data: refreshData,
      };
    });
  };
  // if (!data) {
  //   return null;
  // }
  return (
    <div>
      <Graphin data={data} layout={layout} height={900}>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <MiniMap />
        <ContextMenu>
          <CustomMenu state={state} updateState={setState} nodeMap={nodeMap} aggregatedNodeMap={aggregatedNodeMap} />
        </ContextMenu>
        <ContextMenu bindType="canvas">
          <Menu bindType="canvas">
            <Menu.Item onClick={handleOpen}>开启鱼眼</Menu.Item>
            <Menu.Item onClick={handleRefresh}>重置画布</Menu.Item>
          </Menu>
        </ContextMenu>
        <FishEye options={{ showLabel: false }} visible={visible} handleEscListener={handleClose} />
      </Graphin>
    </div>
  );
};
export default App;
