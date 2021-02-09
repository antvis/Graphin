import React from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { ContextMenu, FishEye, MiniMap, Legend } from '@antv/graphin-components';
import G6 from '@antv/g6';
import { colorSets, clusterColorMap } from './color';
import { Switch } from 'antd';

import CustomMenu from './CustomMenu';
import { icons } from './utils';

const { Menu } = ContextMenu;

console.log('colorSets', colorSets);
const defaultLayout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
  animation: true,
  defSpringLen: (_edge, source, target) => {
    /** 默认返回的是 200 的弹簧长度 */
    /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */

    const nodeSize = 30;
    const Sdegree = source.data.layout.degree;
    const Tdegree = target.data.layout.degree;
    const minDegree = Math.min(Sdegree, Tdegree);
    console.log(minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize);
    return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize;
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
        keyshape: {
          fill: primaryColor, // '#fff',
          fillOpacity: 0.1,
          strokeWidth: 1.2,
          stroke: primaryColor,
          size: [nodeSize, nodeSize],
        },
        label: {
          value: `cluster-${node.id}(${node.nodes.length})`,
          fill: '#000',
          fillOpacity: 0.85,
        },
        halo: {
          fill: primaryColor, // '#fff',
          fillOpacity: 0.1,
          strokeWidth: 1.2,
          stroke: primaryColor,
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
    layout: { ...defaultLayout, animation: true },
  });
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
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

  const { data, visible, layout } = state;
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
  const handleChangeAnimate = checked => {
    console.log('checked', checked);
    setState(preState => {
      return {
        ...preState,
        layout: {
          ...preState.layout,
          animation: checked,
        },
      };
    });
  };
  console.log('GEAMAKER RENDER', state.data);

  return (
    <div>
      <Graphin data={data} layout={layout} height={900}>
        <div style={{ position: 'absolute', top: '300px', left: '0px' }}>
          <Switch
            checkedChildren="开启动画"
            unCheckedChildren="关闭动画"
            defaultChecked
            onChange={handleChangeAnimate}
          />
        </div>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <MiniMap visible />
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
        <Legend bindType="node" sortKey="id" colorKey="style.keyshape.stroke">
          <Legend.Node />
        </Legend>
      </Graphin>
    </div>
  );
};
export default App;
