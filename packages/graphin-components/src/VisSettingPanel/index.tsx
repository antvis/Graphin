import React from 'react';
import { GraphinContext } from '@antv/graphin';
import AntdPanel from './AntdPanel';
import { string } from '@antv/graphin/node_modules/@types/prop-types';

interface IVisSettingPanelProps {
  style?: React.CSSProperties;
}

/** 以下内容，应该是Graphin组件自动感知的 */

export type NodeStyleLabel = Partial<{
  /** label的名称 */
  value: string;
  /** 展示位置 */
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /** 文本填充色 */
  fill: string;
  /** 文本大小 */
  fontSize: number;
  /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
  offset: number;
}>;

export type NodeStyleIcon = Partial<{
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text';
  /** 根据类型，填写对应的值 */
  value: string;
  /** 图标大小 */
  size: number; // | number[];
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: string;
  fontFamily: string;
}>;

export type NodeStyleBadge = Partial<{
  /** 放置的位置，ef：LT（left top）左上角 */
  position: 'LT' | 'RT' | 'RB' | 'LB';
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text';
  value: number | string;
  // type = image 时生效，表示图片的宽度和高度
  size: [number, number] | [number];
  /** 徽标填充色 */
  fill: string;
  /** 徽标描边色 */
  stroke: string;
  /** 徽标内文本的颜色 */
  color: string;
  fontSize: number;
  fontFamily: string;
  // badges 中文本距离四周的偏移量
  padding: number;
  // badges 在 x 和 y 方向上的偏移量
  offset: [number, number];
}>;

export interface NodeStyle {
  /** 节点的主要容器 */
  /** 节点的大小 */
  size: [number] | [number, number];
  /** 填充色 */
  fill: string;
  /** 包围边颜色 */
  stroke: string;

  /** 节点的文本 */
  label: NodeStyleLabel;
  /** 节点的中间位置图标区域 */
  icon: NodeStyleIcon;
  /** 节点的徽标 */
  badges: NodeStyleBadge[];
}

const PrimaryColor = '#205fc2';
const FontColor = '#ddd';
const FontSize = 16;
const FontFamily = 'graphin';
const PrimaryFillColor = '#fff';

const nodeStyleSchema: NodeStyle = {
  /** 节点的大小 */
  size: [30],
  /** 填充色 */
  fill: '#fff',
  /** 包围边颜色 */
  stroke: PrimaryColor,
  /** 节点的文本 */
  label: {
    /** label的名称 */
    value: '',
    /** 展示位置 */
    position: 'bottom',
    /** 文本填充色 */
    fill: FontColor,
    /** 文本大小 */
    fontSize: FontSize,
    /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
    offset: 0,
  },
  /** 节点的中间位置图标区域 */
  icon: {
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'font',
    /** 根据类型，填写对应的值 */
    value: 'home',
    /** 图标大小 */
    size: FontSize, // [FontSize, FontSize],
    /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
    fill: PrimaryColor,
    fontFamily: 'graphin',
  },
  /** 节点的徽标 */
  badges: [
    {
      /** 放置的位置，ef：LT（left top）左上角 */
      position: 'RT',
      /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
      type: 'font',
      value: 'ding',
      // type = image 时生效，表示图片的宽度和高度
      size: [FontSize, FontSize],
      /** 徽标填充色 */
      fill: '#fff',
      /** 徽标描边色 */
      stroke: PrimaryColor,
      /** 徽标内文本的颜色 */
      color: FontColor,
      fontSize: FontSize,
      fontFamily: FontFamily,
      // badges 中文本距离四周的偏移量
      padding: 0,
      // badges 在 x 和 y 方向上的偏移量
      offset: [0, 0],
    },
  ],
};

const boxShadow =
  '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)';
const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  bottom: '0px',
  boxShadow,
  background: '#fff',
  overflowY: 'scroll',
};

const VisSettingPanel: React.FunctionComponent<IVisSettingPanelProps> = (props) => {
  const { graph } = React.useContext(GraphinContext);
  const { style } = props;

  const handleNodeStyleChange = (schema) => {
    const selectedNodes = graph.findAllByState('node', 'selected');
    if (selectedNodes.length === 0) {
      // 则认为是全局样式改变
      graph.getNodes().forEach((node) => {
        /** 状态有优先级 */
        graph.clearItemStates(node);
        graph.updateItem(node, {
          style: {
            ...schema,
          },
        });
      });
    }

    selectedNodes.forEach((node) => {
      graph.updateItem(node, {
        style: {
          ...schema,
        },
      });
      graph.setItemState(node, 'selected', false);
      (node as any).getEdges().forEach((edge) => {
        graph.setItemState(edge, 'selected', false);
      });
    });

    console.log(graph);
  };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <AntdPanel nodeStyleSchema={nodeStyleSchema} handleNodeStyleChange={handleNodeStyleChange} />
    </div>
  );
};

export default VisSettingPanel;
