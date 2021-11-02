/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import G6, { EdgeConfig, IEdge, IGroup, INode, ModelConfig } from '@antv/g6';
import { deepMix } from '@antv/util';
import { getDefaultStyleByTheme } from '../theme';
import { EdgeStyle } from '../typings/type';
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
    const dy = Math.sqrt(R ** 2 - dx ** 2);

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
          const calcWidth = String(value).length * fontSize * 0.6;
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
          const labelBackgroundShape = (group as IGroup).addShape('rect', {
            attrs: {
              id: 'label-background',
              x: -width / 2 + offsetX,
              y: -height / 2 + offsetY,
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
        if (isLoop) {
          y = offsetY - nodeSize * 1.6 - (keyShapeStyle?.loop?.distance || 0) * 2;
        }
        if (hasBackground) {
          y = offsetY + fontSize / 2;
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
              setStatusStyle(shapes, initialStyle, parseAttr); // 没匹配到就重置
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
  });
};
