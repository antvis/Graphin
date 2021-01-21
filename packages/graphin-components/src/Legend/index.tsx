import React from 'react';
import {
  GraphinContext,
  Graph,
  GraphData,
  TreeGraphData,
  NodeConfig,
  EdgeConfig,
  GraphinContextType,
} from '@antv/graphin';
import Node from './Node';

export interface LegendProps {
  /** 绑定的类型 */
  bindType: 'node' | 'edge';
  /**
   * @description 分类映射的Key值
   */
  sortKey: string;
  /**
   * @description  颜色映射的Key值
   * @default "style.stroke"
   */
  colorKey?: string;
  /**
   * @description 样式
   */
  style?: React.CSSProperties;
}
export interface OptionType {
  /** 颜色 */
  color: string;
  /** 值 */
  value: string | number;
  /** 标签 */
  label: string;
  /** 是否选中 */
  checked: boolean;
}

const getEnumValue = (keyString: string, data) => {
  const keyArray = keyString.split('.');
  const enumValue = keyArray.reduce((acc: {}, curr) => {
    return acc[curr] || {};
  }, data) as string;
  return enumValue;
};

const calculate = ({
  bindType,
  sortKey,
  graph,
  colorKey,
}: {
  bindType: LegendProps['bindType'];
  sortKey: LegendProps['sortKey'];
  graph: Graph;
  colorKey: string;
}) => {
  const data = graph.save();

  const treeData = data as TreeGraphData;
  const graphData = data as GraphData;
  const nodeMapByMapKey: Map<string | number, NodeConfig[]> = new Map();
  const edgeMapByMapKey: Map<string | number, EdgeConfig[]> = new Map();
  /** 暂时不支持treeGraph的legend */
  if (treeData.children) {
    console.error('not support tree graph');
    return {
      dataMap: new Map(),
      options: {},
    };
  }

  const { nodes = [], edges = [] } = graphData;

  if (bindType === 'node') {
    nodes.forEach((node) => {
      /** 得到枚举值 */
      const enumValue = getEnumValue(sortKey, node);
      /** 按照枚举值重新将节点存放 */
      const current = nodeMapByMapKey.get(enumValue);
      if (current) {
        nodeMapByMapKey.set(enumValue, [...current, node]);
      } else {
        nodeMapByMapKey.set(enumValue, [node]);
      }
    });
    /** 计算legend.content 的 options */
    const keys = [...nodeMapByMapKey.keys()];
    const options = keys.map((key) => {
      const node = (nodeMapByMapKey.get(key) || [{}])[0];
      const color = getEnumValue(colorKey, node);
      return {
        /** 颜色 */
        color,
        /** 值 */
        value: key,
        /** 标签 */
        label: key,
        /** 是否选中 */
        checked: true,
      };
    });
    return {
      dataMap: nodeMapByMapKey,
      options,
    };
  }
  // if (bindType === 'edge') {
  edges.forEach((edge) => {
    /** 得到枚举值 */
    const enumValue = getEnumValue(sortKey, edge);

    const current = edgeMapByMapKey.get(enumValue);
    if (current) {
      edgeMapByMapKey.set(enumValue, [...current, edge]);
    } else {
      edgeMapByMapKey.set(enumValue, [edge]);
    }
  });
  /** 计算legend.content 的 options */
  const keys = [...edgeMapByMapKey.keys()];
  const options = keys.map((key) => {
    const edge = (edgeMapByMapKey.get(key) || [{}])[0];
    const color = getEnumValue(colorKey, edge);
    return {
      /** 颜色 */
      color,
      /** 值 */
      value: key,
      /** 标签 */
      label: key,
      /** 是否选中 */
      checked: true,
    };
  });

  return { dataMap: edgeMapByMapKey, options };
};
export interface LegendContextType extends GraphinContextType {
  legend: {
    node?: {
      bindType: string;
      sortKey: string;
      colorKey: string;
      dataMap: Map<string, NodeConfig[]>;
      options: OptionType[];
    };
    edge?: {
      bindType: string;
      sortKey: string;
      colorKey: string;
      dataMap: Map<string, EdgeConfig[]>;
      options: OptionType[];
    };
  };
}
const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
};
const Legend: React.FunctionComponent<LegendProps> & { Node: typeof Node } = (props) => {
  const graphin = React.useContext<GraphinContextType>(GraphinContext);
  const { graph } = graphin;
  const { bindType, sortKey, children, colorKey = 'style.stroke', style } = props;
  const { dataMap, options } = calculate({ bindType, sortKey, graph, colorKey });

  graphin.legend = {
    ...graphin.legend,
    // 一个Graphin组件下，最多仅有2个Legend组件：node和edge
    [bindType]: {
      bindType,
      sortKey,
      colorKey,
      dataMap,
      options,
    },
  };
  console.log('%c legend Container', 'color:red');
  return (
    <div className="graphin-components-legend" style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
};

Legend.Node = Node;
export default Legend;
