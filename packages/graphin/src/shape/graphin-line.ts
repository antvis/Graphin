/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import G6, { EdgeConfig, IEdge, IGroup, INode, ModelConfig } from '@antv/g6';
import { deepMix } from '@antv/util';
import { getDefaultStyleByTheme } from '../theme';
import { EdgeStyle } from '../typings/type';
import calcByteLength from '../utils/calcByteLength';
import { setStatusStyle } from './utils';

const getStyleByTheme = (theme = {}) => {
  const themeResult = getDefaultStyleByTheme(theme);
  const { defaultEdgeStyle, defaultEdgeStatusStyle } = themeResult;
  return {
    style: defaultEdgeStyle.style,
    status: defaultEdgeStatusStyle.status,
  };
};

export enum EnumNodeAndEdgeStatus {
  NORMAL = 'normal',
  SELECTED = 'selected',
  HOVERED = 'hovered',
  DISABLED = 'disabled',
}

export function removeDumpAttrs(attrs: any) {
  Object.keys(attrs).forEach(key => {
    if (attrs[key] === undefined) {
      delete attrs[key];
    }
  });
  return attrs;
}
export function parseLabel(json: EdgeStyle['label']) {
  const { value, ...others } = json;
  const attrs = {
    id: 'label',
    text: value,
    ...others,
  };
  return removeDumpAttrs(attrs);
}

export function parseKeyShape(json: EdgeStyle['keyshape']) {
  const { ...others } = json;
  const attrs = {
    id: 'keyshape',
    ...others,
  };
  return removeDumpAttrs(attrs);
}

export function parseHalo(json: EdgeStyle['halo']) {
  const { ...others } = json;
  const attrs = {
    id: 'halo',
    ...others,
  };
  return removeDumpAttrs(attrs);
}

function parseLabelBackground(json: EdgeStyle['label']['background']) {
  return {
    id: 'label-background',
    ...json
  }
}
const parseAttr = (style: EdgeStyle, itemShapeName: string) => {
  if (itemShapeName === 'keyshape') {
    return parseKeyShape(style.keyshape || {});
  }
  if (itemShapeName === 'halo') {
    return parseHalo(style.halo || {});
  }
  if (itemShapeName === 'label') {
    return parseLabel(style.label || {});
  }
  if(itemShapeName === 'label-background'){
    return parseLabelBackground(style[itemShapeName] || {});
  }
  return {};
};

// @ts-ignore

const getPolyEdgeControlPoint = (p1: Position, p2: Position, d: number) => {
  const pm = {
    x: (p2.x + p1.x) / 2,
    y: (p2.y + p1.y) / 2,
  };
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const c = Math.sqrt(dx ** 2 + dy ** 2);
  const y = pm.y - (dx * d) / c || 0;
  const x = pm.x + (dy * d) / c || 0;
  return {
    x,
    y,
  };
};

const processKeyshape = (cfg: EdgeConfig, style: EdgeStyle) => {
  const { startPoint = { x: 0, y: 0 }, endPoint = { x: 0, y: 0 }, sourceNode, targetNode } = cfg;

  const { keyshape } = style;

  const { type = 'line', poly = { distance: 0 }, loop = {} } = keyshape;
  const source = (sourceNode as INode).get('model');
  const target = (targetNode as INode)?.get('model') || { id: 'temp' };

  if (type === 'loop' || source.id === target.id) {
    const nodeSize = source.style?.keyshape?.size || 26;
    const { distance, dx, rx, ry } = {
      // 默认是是节点的高度
      distance: 0,
      // x的偏移量
      dx: 8,
      rx: undefined,
      ry: undefined,
      ...loop,
    };
    const R = nodeSize / 2;
    const dy = Math.sqrt(Math.max(R ** 2 - dx ** 2, 0));

    const RX = rx || R * 2 * 0.5;
    const RY = ry || R * 2 * 0.6;
    return [
      ['M', startPoint.x - dx, startPoint.y - dy],
      /**
       * A rx ry x-axis-rotation large-arc-flag sweep-flag x y
       * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
       */
      [
        'A',
        RX + distance, // rx
        RY + distance, // ry
        0, // x-axis-rotation
        1, // large-arc-flag
        1, // sweep-flag
        startPoint.x + dx, // endPoint.x
        startPoint.y - dy, // endPoint.y
      ],
    ];
  }
  if (type === 'poly') {
    const controlPoints = getPolyEdgeControlPoint(startPoint, endPoint, poly?.distance || 0);
    return [
      ['M', startPoint.x, startPoint.y],
      /**
       * 二阶贝塞尔曲线
       */
      ['Q', controlPoints.x, controlPoints.y, endPoint.x, endPoint.y],
    ];
  }
  // 默认是line
  return [
    ['M', startPoint.x, startPoint.y],
    ['L', endPoint.x, endPoint.y],
  ];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default () => {
  G6.registerEdge('graphin-line', {
    draw(cfg: ModelConfig | undefined, group: IGroup | undefined) {
      const { _theme } = cfg.style;

      this.options = getStyleByTheme(_theme);

      const style = deepMix({}, this.options.style, cfg.style) as EdgeStyle;

      /** 将初始化样式存储在model中 */
      if (cfg) {
        // eslint-disable-next-line no-underscore-dangle
        cfg._initialStyle = { ...style };
      }

      const { startPoint = { x: 0, y: 0 }, endPoint = { x: 0, y: 0 }, sourceNode, targetNode } = cfg as EdgeConfig;

      const { label, halo, keyshape: keyShapeStyle } = style;
      /** 计算目标节点的大小 */
      const source = (sourceNode as INode).get('model');
      const target = (targetNode as INode)?.get('model') || { id: 'temp' };
      const nodeSize = source.style?.keyshape?.size || 28;
      /** 计算是否为loop */
      const isLoop = keyShapeStyle?.type === 'loop' || source.id === target.id;
      const hasLabel = label.value;
      /** 计算poly控制点 */
      const isPoly = keyShapeStyle?.type === 'poly';
      const controlPoints = getPolyEdgeControlPoint(startPoint, endPoint, keyShapeStyle?.poly?.distance || 0);

      const lineWidth = keyShapeStyle?.lineWidth || 1;
      const d = lineWidth + 5;

      const path = processKeyshape(cfg as EdgeConfig, style);

      // TODO:支持多边
      // const path = [
      //   ['M', startPoint.x, startPoint.y],
      //   ['L', endPoint.x, endPoint.y],
      // ];

      /** 光环 */
      (group as IGroup).addShape('path', {
        attrs: {
          id: 'halo',
          path,
          lineWidth: lineWidth + 10,
          stroke: halo.stroke || keyShapeStyle.stroke,
          strokeOpacity: halo.strokeOpacity || 0.4,
          ...halo,
        },
        draggable: true,
        name: 'halo',
        visible: halo.visible !== false,
      });

      /** 主路径 */
      const key = (group as IGroup).addShape('path', {
        attrs: {
          id: 'keyshape',
          path,
          endArrow: isLoop
            ? undefined
            : {
                d: 0,
                path: `M 0,0 L ${d},${d / 2} L ${d},-${d / 2} Z`,
                fill: keyShapeStyle.stroke,
              },
          startArrow: isLoop
            ? {
                d: 0,
                path: `M 0,0 L ${d},${d / 2} L ${d},-${d / 2} Z`,
                fill: keyShapeStyle.stroke,
              }
            : undefined,
          ...keyShapeStyle,
        },
        draggable: true,
        name: 'keyshape',
      });

      /** 标签 */
      if (hasLabel) {
        const { value, fontSize = 8, offset = [0, 0], background, ...others } = label;
        const hasBackground = Boolean(background);
        const [offsetX, offsetY] = offset;
        /** 计算标签和标签背景的旋转角度 */
        let degree = Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x));
        /** 计算标签和标签背景的位移位置 */
        let midPosition = [(startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2];
        if (isPoly) {
          // TODO: 这里label坐标计算有问题，需要调整算法, 今天搞不动了，明天再处理
          midPosition = [(controlPoints.x + midPosition[0]) / 2, (controlPoints.y + midPosition[1]) / 2];
        }

        if (endPoint.x - startPoint.x === 0) {
          degree = Math.PI / 2;
        }
        if (isLoop) {
          degree = 2 * Math.PI;
        }

        /** 设置标签的背景 */
        if (hasBackground) {
          const byteLength = calcByteLength(value);
          const calcWidth = byteLength * fontSize * 0.6;
          const calcHeight = fontSize * 1.8;
          const defaultBackground = {
            fill: '#fff',
            width: calcWidth,
            height: calcHeight,
            stroke: keyShapeStyle.stroke,
            lineWidth: 1,
            radius: 6,
          };

          const { fill, width, height, stroke, ...otherBackgroundAttrs } = { ...defaultBackground, ...background };
          let y = -height / 2 + offsetY;
          if (isLoop) {
            // 自环情况下需要特殊处理位置
            y = -(height / 2 + offsetY + fontSize + nodeSize * 1 + (keyShapeStyle?.loop?.distance || 0) * 2);
          }

          const labelBackgroundShape = (group as IGroup).addShape('rect', {
            attrs: {
              id: 'label-background',
              x: -width / 2 + offsetX,
              y,
              width,
              height,
              fill,
              stroke,
              ...otherBackgroundAttrs,
            },
            draggable: true,
            name: 'label-background',
          });

          /** 处理标签自动旋转问题 */
          labelBackgroundShape.rotate(degree);
          labelBackgroundShape.translate(midPosition[0], midPosition[1]);
        }

        /** 设置标签的文本 */
        let y = offsetY - fontSize / 2;
        if (hasBackground) {
          y = offsetY + fontSize / 2;
        }
        // 自环情况下特殊处理
        if (isLoop) {
          if (hasBackground) {
            y = -(offsetY + fontSize / 2 + nodeSize * 1 + (keyShapeStyle?.loop?.distance || 0) * 2);
          } else {
            y = -(offsetY + fontSize + nodeSize * 1 + (keyShapeStyle?.loop?.distance || 0) * 2);
          }
        }

        const labelShape = (group as IGroup).addShape('text', {
          attrs: {
            id: 'label',
            x: offsetX,
            y,
            text: value,
            fontSize,
            ...others,
          },
          draggable: true,
          name: 'label',
        });
        /** 处理标签自动旋转问题 */
        labelShape.rotate(degree);
        labelShape.translate(midPosition[0], midPosition[1]);
      }
      return key;
    },
    setState(
      name: EnumNodeAndEdgeStatus | string | undefined,
      value: string | boolean | undefined,
      item: IEdge | INode | undefined,
    ) {
      if (!name) return;
      const model = (item as IEdge).getModel() as EdgeConfig;
      const shapes = (item as IEdge).getContainer().get('children'); // 顺序根据 draw 时确定

      const initStateStyle = deepMix({}, this.options.status, model.style.status);

      const initialStyle = (item as IEdge).getModel()._initialStyle as EdgeStyle;

      const status = (item as IEdge)._cfg?.states || [];

      try {
        Object.keys(initStateStyle).forEach(statusKey => {
          if (name === statusKey) {
            if (value) {
              setStatusStyle(shapes, initStateStyle[statusKey], parseAttr); // 匹配到status就改变
            } else {
              setStatusStyle(shapes, {
                ...initialStyle,
                ['label-background']: initialStyle.label?.background
              }, parseAttr); // 没匹配到就重置
              status.forEach(key => {
                // 如果cfg.status中还有其他状态，那就重新设置回来
                setStatusStyle(shapes, initStateStyle[key], parseAttr);
              });
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    afterDraw(cfg: ModelConfig | undefined, group: IGroup | undefined) {
      const style = deepMix({}, this.options.style, cfg.style) as EdgeStyle;
      const { animate, keyshape } = style;
      /** 如果没有 style.animate 就不绘制 */
      if (!animate || !animate.type || animate.visible === false) {
        return;
      }
      // get the keshape
      const shape = group.get('children').find(s => {
        return s.get('name') === 'keyshape';
      });

      const { color, type, repeat = true, duration = 3000 } = animate;
      if (type === 'circle-running') {
        // the start position of the edge's path
        const startPoint = shape.getPoint(0);

        // add red circle shape
        const circle = group.addShape('circle', {
          attrs: {
            x: startPoint.x,
            y: startPoint.y,
            fill: color || keyshape.stroke,
            r: keyshape.lineWidth * 1.5 + 2,
          },
          name: 'circle-shape',
        });

        // animation for the red circle
        circle.animate(
          ratio => {
            const tmpPoint = shape.getPoint(ratio);
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat, // Whether executes the animation repeatly
            duration, // the duration for executing once
          },
        );
      }
      if (type === 'line-dash') {
        let index = 0;
        const lineDash = animate.lineDash || keyshape.lineDash || [4, 2, 1, 2];
        // Define the animation
        shape.animate(
          () => {
            index++;

            if (index > 9) {
              index = 0;
            }
            // returns the modified configurations here, lineDash and lineDashOffset here
            return {
              lineDash,
              lineDashOffset: -index,
            };
          },
          {
            repeat, // whether executes the animation repeatly
            duration, // the duration for executing once
          },
        );
      }
      if (type === 'line-growth') {
        const length = shape.getTotalLength();

        shape.animate(
          ratio => {
            // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
            const startLen = ratio * length;
            // Calculate the lineDash
            return {
              lineDash: [startLen, length - startLen],
            };
          },
          {
            repeat, // Whether executes the animation repeatly
            duration, // the duration for executing once
          },
        );
      }
    },
  });
};
