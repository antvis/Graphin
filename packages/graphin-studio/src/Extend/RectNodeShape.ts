// import { NodeShapeFunction } from '@antv/graphin';
import { Node } from '@types';
import { NodeShapeFunction } from '@antv/graphin';

const defaultStyles = {
  /** container 容齐 */
  containerWidth: 40,
  containerStroke: '#0693E3',
  containerFill: '#fff',
  /** icon 图标 */
  iconSize: 10,
  iconFill: '#0693E3',
  /** badge 徽标 */
  badgeFill: 'red',
  badgeFontColor: '#fff',
  badgeSize: 10,
  /** text 文本 */
  fontColor: '#3b3b3b',
  fontSize: 12,
};
type Style = typeof defaultStyles;
// eslint-disable-next-line
const renderRectNode: NodeShapeFunction = (node: Node) => {
  const style: Style = {
    ...defaultStyles,
    ...node.style,
  };
  const badgeNumber = node.data.properties.length;

  return {
    shape: 'RectNode',
    shapeComponents: [
      {
        shape: 'rect',
        attrs: {
          id: 'rect-container',
          x: 0,
          y: 0,
          width: style.containerWidth,
          height: style.containerWidth,
          fill: style.containerFill,
          stroke: style.containerStroke,
          cursor: 'pointer',
          lineWidth: 2,
          radius: 2,
        },
      },
      {
        shape: 'circle',
        attrs: {
          id: 'badge',
          x: style.containerWidth,
          y: 0,
          r: style.badgeSize,
          fill: style.badgeFill,
          cursor: 'pointer',
          lineWidth: 1,
        },
      },
      {
        shape: 'text',
        attrs: {
          id: 'badge-text',
          x: style.containerWidth,
          y: -4,
          text: badgeNumber,
          fontSize: 10,
          cursor: 'pointer',
          fill: '#fff',
          textAlign: 'center',
          textBaseline: 'top',
        },
      },
      {
        shape: 'marker',
        attrs: {
          id: 'node-icon',
          symbol: node.data.type,
          x: style.containerWidth / 2,
          y: style.containerWidth / 2,
          r: style.iconSize,
          fill: style.iconFill,
        },
      },
      // // iconFont
      // {
      //     shape: 'text',
      //     attrs: {
      //         id: 'node-icon',
      //         x: style.containerWidth / 2,
      //         y: style.containerWidth / 2,
      //         fontSize: style.iconSize,
      //         fill: style.iconFill,
      //         text: '',
      //         fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
      //         textAlign: 'center',
      //         textBaseline: 'middle',
      //     },
      // },
      {
        shape: 'text',
        attrs: {
          id: 'text-desc',
          text: node.data.label,
          x: 0,
          y: style.containerWidth * 1.3,
          cursor: 'pointer',
          fontSize: style.fontSize,
          fill: style.fontColor,
          fontWeight: 'lighter',
          fontFamily: 'Courier New',
          textAlign: 'center',
          textBaseline: 'top',
        },
      },
    ],
    state: {
      selected: {
        'rect-container': {
          stroke: style.containerStroke,
          fill: style.containerStroke,
          animate: {
            attrs: {
              lineWidth: 6,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 2,
              shadowColor: '#fff',
              repeat: false, // 循环
            },
            duration: 200,
            easing: 'easeCubic',
            callback: null,
            delay: 0,
          },
        },
        'node-icon': {
          fill: '#fff',
        },
        badge: {
          lineWidth: 6,
        },
      },
      'highlight.dark': {
        'rect-container': {
          fill: style.dark,
          stroke: style.dark,
          lineWidth: 0,
        },
        'node-icon': {
          fill: style.dark,
        },
        'text-desc': {
          fill: '#eee',
        },
        badge: {
          fill: style.dark,
        },
        'badge-text': {
          fill: style.dark,
        },
      },
    },
  };
};
export default renderRectNode;
