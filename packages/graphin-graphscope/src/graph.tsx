// @ts-ignore
import React, { useState, useEffect } from 'react';
import Graphin, { Behaviors, Utils, NodeConfig } from '@antv/graphin';
import { ContextMenu, FishEye, MiniMap } from '@antv/graphin-components';
import { message } from 'antd';
// import iconLoader from '@antv/graphin-icons';
import { colorSets } from './color';
import LayoutSelector from './layoutSelector';
import ElementDetailPanel from './detail';

import CustomMenu from './contextmenu';

import '@antv/graphin-icons/dist/index.css';
import ClickElement from './events/click';

const { hexToRgbaToHex } = Utils;

// const icons = Graphin.registerFontFamily(iconLoader);

const { Menu } = ContextMenu;

/** Graphin */
const { ZoomCanvas, DragNode } = Behaviors;

const nodeSize = 40;
// const badgeSize = 12;

export interface NodeData extends NodeConfig {
  id: string;
  label: string;
  parentId?: string;
  degree?: number;
  nodeType?: string;
  properties?: {
    [key: string]: string | number;
  };
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  edgeType?: string;
  properties: {
    [key: string]: string | number;
  };
}

export interface GraphData {
  graphVisId?: string;
  nodes: NodeData[];
  edges: EdgeData[];
}

interface GraphProps {
  graphDOM: HTMLDivElement;
  data: GraphData;
  width?: number;
  height: number;
  neighbors?: (nodeId: string, degree: number) => void;
  hasMinimap?: boolean;
  hasContextMenu?: boolean;
  hasFishEye?: boolean;
  hasLayoutSelector?: boolean;
  zoomCanvas?: boolean;
  // 节点 label 上显示的字段属性名称
  nodeLabel?: string;
  nodeClick?: (model: NodeData, type: string) => void;
}

const defaultLayout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
  animation: true,
  // @ts-ignore
  defSpringLen: (_edge: any, source: any, target: any) => {
    /** 默认返回的是 200 的弹簧长度 */
    /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */

    const size = 10;
    const Sdegree = source.data.layout.degree;
    const Tdegree = target.data.layout.degree;
    const minDegree = Math.min(Sdegree, Tdegree);
    return minDegree < 3 ? size * 5 : minDegree * size;
  },
};

const layouts = [
  {
    type: 'graphin-force',
    label: '默认力导布局',
  },
  {
    type: 'grid',
    label: '网格布局',
    // begin: [0, 0], // 可选，
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // preventOverlapPdding: 20, // 可选
    // nodeSize: 30, // 可选
    // condense: false, // 可选
    // rows: 5, // 可选
    // cols: 5, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'circular',
    label: '圆形布局',
    // center: [200, 200], // 可选，默认为图的中心
    // radius: null, // 可选
    // startRadius: 10, // 可选
    // endRadius: 100, // 可选
    // clockwise: false, // 可选
    // divisions: 5, // 可选
    // ordering: 'degree', // 可选
    // angleRatio: 1, // 可选
  },
  {
    type: 'radial',
    label: '径向布局',
    // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // maxIteration: 1000, // 可选
    // focusNode: 'node11', // 可选
    // unitRadius: 100, // 可选
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // strictRadial: false, // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'force',
    label: '经典力导布局',
    preventOverlap: true,
    // center: [200, 200], // 可选，默认为图的中心
    linkDistance: 50, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.8, // 可选
    collideStrength: 0.8, // 可选
    nodeSize: 30, // 可选
    alpha: 0.9, // 可选
    alphaDecay: 0.3, // 可选
    alphaMin: 0.01, // 可选
    // forceSimulation: null, // 可选
    onTick: () => {
      // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {
      // 可选
      console.log('force layout done');
    },
  },
  {
    type: 'gForce',
    label: 'AntV力导布局',
    linkDistance: 150, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.1, // 可选
    nodeSize: 30, // 可选
    onTick: () => {
      // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {
      // 可选
      console.log('force layout done');
    },
    workerEnabled: false, // 可选，开启 web-worker
    gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: 'concentric',
    label: '同心圆布局',
    maxLevelDiff: 0.5,
    sortBy: 'degree',
    // center: [200, 200], // 可选，
    // linkDistance: 50, // 可选，边长
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // sweep: 10, // 可选
    // equidistant: false, // 可选
    // startAngle: 0, // 可选
    // clockwise: false, // 可选
    // maxLevelDiff: 10, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'dagre',
    label: '层次布局',
    rankdir: 'LR', // 可选，默认为图的中心
    // align: 'DL', // 可选
    // nodesep: 20, // 可选
    // ranksep: 50, // 可选
    // controlPoints: true, // 可选
  },
  {
    type: 'fruchterman',
    label: '力导布局',
    // center: [200, 200], // 可选，默认为图的中心
    // gravity: 20, // 可选
    // speed: 2, // 可选
    // clustering: true, // 可选
    // clusterGravity: 30, // 可选
    // maxIteration: 2000, // 可选，迭代次数
    // workerEnabled: false, // 可选，开启 web-worker
    // gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
];

let refreshData: GraphData = null;

const colorLabelMap: {
  [key: string]: string;
} = {};

const GraphScope: React.FC<GraphProps> = ({
  data,
  neighbors,
  width,
  height,
  graphDOM,
  hasMinimap = true,
  hasContextMenu = true,
  hasFishEye = true,
  hasLayoutSelector = true,
  zoomCanvas = true,
  nodeLabel = 'id',
  nodeClick,
}) => {
  const [state, setState] = useState({
    visible: false,
    layout: { ...defaultLayout, animation: false },
    data: {},
  });

  const transGraphData = (originData: GraphData): any => {
    let labelCount = 0;
    const nodes = originData.nodes.map((node: NodeData) => {
      if (!colorLabelMap[node.label]) {
        labelCount += 1;
        const primaryColor = colorSets[labelCount > 10 ? 0 : labelCount].mainFill;
        colorLabelMap[node.label] = primaryColor;
      }

      const currentNode = {
        ...node,
        type: 'graphin-circle',
        style: {
          keyshape: {
            fill: hexToRgbaToHex(colorLabelMap[node.label], 0.3),
            stroke: colorLabelMap[node.label],
            size: [nodeSize, nodeSize],
          },
          label: {
            value: node.label,
            fill: hexToRgbaToHex('#000', 0.85),
          },
          halo: {
            fill: hexToRgbaToHex(colorLabelMap[node.label], 0.1),
            stroke: colorLabelMap[node.label],
          },
          // icon: {
          //   fontFamily: 'graphin',
          //   type: 'font',
          //   value: icons.team,
          //   fill: primaryColor,
          //   size: nodeSize / 1.6,
          // },
          // badges: [
          //   {
          //     position: 'RT',
          //     type: 'text',
          //     value: index,
          //     size: [badgeSize, badgeSize],
          //     fill: primaryColor,
          //     stroke: primaryColor,
          //     color: '#fff',
          //     fontSize: badgeSize * 0.8,
          //     padding: 0,
          //     offset: [0, 0],
          //   },
          // ],
        },
      };

      return currentNode;
    });

    const edges = originData.edges.map((edge: EdgeData) => {
      return {
        ...edge,
        label: '',
        size: 0.5,
        color: '#AAB7C4', // '#545872',
        style: {
          keyshape: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#545872',
            },
          },
        },
      };
    });

    return {
      nodes,
      edges,
    };
  };

  useEffect(() => {
    const transData = transGraphData(data);
    refreshData = transData;
  }, []);

  useEffect(() => {
    const transData = transGraphData(data);
    setState(preState => {
      return {
        ...preState,
        data: transData,
      };
    });
  }, [data]);

  const { visible, layout } = state;
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

  const expandNeighbors = (nodeId: string, degree: number) => {
    if (!neighbors) {
      message.warning('请先配置节点扩展后的回调函数');
      return;
    }
    neighbors(nodeId, degree);
  };

  const handleChangeLayout = (value: string) => {
    const currentLayout = layouts.find(item => item.type === value);
    setState(preState => {
      return {
        ...preState,
        layout: currentLayout as any,
      };
    });
  };

  const [detailInfo, setDetailInfo] = useState({
    visible: false,
    data: null,
    type: null,
  });
  const handleClickElement = (model: NodeConfig, type: string) => {
    setDetailInfo({
      visible: true,
      data: model,
      type,
    });
    if (nodeClick) {
      nodeClick(model as NodeData, type);
    }
  };

  return (
    <div>
      <Graphin graphDOM={graphDOM} data={state.data as any} layout={layout} width={width} height={height}>
        <ZoomCanvas disabled={zoomCanvas} enableOptimize />
        <ClickElement nodeClick={handleClickElement} />
        <DragNode />
        {hasMinimap && <MiniMap visible options={{ padding: 20, size: [140, 70] }} />}
        {hasLayoutSelector && (
          <LayoutSelector onChange={handleChangeLayout} value={state.layout.type} options={layouts} />
        )}
        {hasContextMenu && (
          <>
            <ContextMenu style={{ width: 90 }}>
              <CustomMenu expandNeighbors={expandNeighbors} />
            </ContextMenu>
            <ContextMenu bindType="canvas">
              <Menu bindType="canvas">
                <Menu.Item onClick={handleOpen}>开启鱼眼</Menu.Item>
                <Menu.Item onClick={handleRefresh}>重置画布</Menu.Item>
              </Menu>
            </ContextMenu>
          </>
        )}
        {hasFishEye && <FishEye options={{ showLabel: false }} visible={visible} handleEscListener={handleClose} />}
        {detailInfo.visible && (
          <div style={{ position: 'absolute', top: 40, right: 0 }}>
            <ElementDetailPanel
              type={detailInfo.type}
              data={detailInfo.data}
              close={() => setDetailInfo({ visible: false, data: null, type: '' })}
              itemId={detailInfo.data.id}
            />
          </div>
        )}
      </Graphin>
    </div>
  );
};
export default GraphScope;
