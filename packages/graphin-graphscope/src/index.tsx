import React, { useState, useEffect } from 'react';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import { ContextMenu, FishEye, MiniMap } from '@antv/graphin-components';
import { colorSets, clusterColorMap } from './color';
// import { Switch } from 'antd';

const { hexToRgbaToHex } = Utils;

import CustomMenu from './contextmenu';

import iconLoader from '@antv/graphin-icons';
import '@antv/graphin-icons/dist/index.css';

const icons = Graphin.registerFontFamily(iconLoader);

const { Menu } = ContextMenu;

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

const nodeSize = 40;
const badgeSize = 12;

/** 转化函数 */
const transClusterData = data => {
  const nodes = data.nodes.map((node, index) => {
    const primaryColor = colorSets[index > 11 ? 0 : index].mainFill;
    clusterColorMap.set(node.id, primaryColor);

    const nodes = {
      ...node,
      type: 'graphin-circle',
      style: {
        keyshape: {
          fill: hexToRgbaToHex(primaryColor, 0.1), // '#fff',
          strokeWidth: 1.2,
          stroke: primaryColor,
          size: [nodeSize, nodeSize],
        },
        label: {
          value: `cluster-${node.id}(${node.nodes.length})`,
          fill: hexToRgbaToHex('#000', 0.85),
        },
        halo: {
          fill: hexToRgbaToHex(primaryColor, 0.1), // '#fff',
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

    return nodes;
  });

  const edges = data.edges.map(edge => {
    const size = Math.log(edge.count) || 0.5;
    return {
      ...edge,
      label: '',
      size: size > 0.5 ? size : 0.5,
      color: '#AAB7C4', // '#545872',
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#545872',
        },
      },
    };
  });

  return {
    nodes,
    edges,
  };
};

interface IGraphProps {
  data: any;
  width: number;
  height: number;
  neighbors: (nodeId: string, degree: number) => void;
}

let refreshData = null;

const GraphScope: React.FC<IGraphProps> = ({ data, neighbors, width, height }) => {
  const [state, setState] = useState({
    originData: {},
    source: {},
    visible: false,
    layout: { ...defaultLayout, animation: true },
  });

  useEffect(() => {
    const transData = transClusterData(data);
    refreshData = transData;

    setState(preState => {
      return {
        ...preState,
        originData: data,
        source: data,
      };
    });
  }, [data]);

  const { originData, visible, layout } = state;
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

  const expandNeighbors = (nodeId: string, degree: number) => {
    neighbors(nodeId, degree);
  };

  return (
    <div>
      <Graphin data={data} layout={layout} width={width} height={height}>
        {/* <div style={{ position: 'absolute', top: '300px', left: '0px' }}>
          <Switch
            checkedChildren="开启动画"
            unCheckedChildren="关闭动画"
            defaultChecked
            onChange={handleChangeAnimate}
          />
        </div> */}
        <ZoomCanvas enableOptimize />
        <DragNode />
        <MiniMap />
        <ContextMenu>
          <CustomMenu expandNeighbors={expandNeighbors} />
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
export default GraphScope;
