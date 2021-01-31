/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroup } from '@antv/g-canvas';
import G6, { EdgeConfig, IEdge, INode, ModelConfig } from '@antv/g6';

import { deepMix } from '@antv/util';
import { EdgeStyle } from '../typings/type';
import { setStatusStyle } from './utils';

export enum EnumNodeAndEdgeStatus {
  NORMAL = 'normal',
  SELECTED = 'selected',
  HOVERED = 'hovered',
  DISABLED = 'disabled',
}

export function removeDumpAttrs(attrs: any) {
  Object.keys(attrs).forEach((key) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default () => {
  G6.registerEdge('graphin-line', {
    draw(cfg: ModelConfig | undefined, group: IGroup | undefined) {
      const style = deepMix({}, cfg && cfg.style) as EdgeStyle;
      /** 将初始化样式存储在model中 */
      if (cfg) {
        // eslint-disable-next-line no-underscore-dangle
        cfg._initialStyle = { ...style };
      }

      const { startPoint = { x: 0, y: 0 }, endPoint = { x: 0, y: 0 } } = cfg as EdgeConfig;

      const { label, halo, keyshape: keyShapeStyle } = style;

      const hasLabel = label.value;

      const lineWidth = keyShapeStyle?.lineWidth || 1;
      const d = lineWidth + 5;

      // TODO:支持多边
      const path = [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y],
      ];

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
          endArrow: {
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
              x: -width / 2,
              y: -height / 2,
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
          labelBackgroundShape.rotate(
            endPoint.x - startPoint.x === 0
              ? Math.PI / 2
              : Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)),
          );
          labelBackgroundShape.translate((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
        }
        /** 设置标签的文本 */
        const labelShape = (group as IGroup).addShape('text', {
          attrs: {
            id: 'label',
            x: offsetX,
            y: hasBackground ? offsetY + fontSize / 2 : offsetY - fontSize / 2,
            text: value,
            fontSize,
            ...others,
          },
          draggable: true,
          name: 'label',
        });
        /** 处理标签自动旋转问题 */
        labelShape.rotate(
          endPoint.x - startPoint.x === 0
            ? Math.PI / 2
            : Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)),
        );
        labelShape.translate((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
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
      const initStateStyle = deepMix({}, (model.style as EdgeStyle).status);

      const initialStyle = (item as IEdge).getModel()._initialStyle as EdgeStyle;

      const status = (item as IEdge)._cfg?.states || [];

      try {
        Object.keys(initStateStyle).forEach((statusKey) => {
          if (name === statusKey) {
            if (value) {
              setStatusStyle(shapes, initStateStyle[statusKey], parseAttr); // 匹配到status就改变
            } else {
              setStatusStyle(shapes, initialStyle, parseAttr); // 没匹配到就重置
              status.forEach((key) => {
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
