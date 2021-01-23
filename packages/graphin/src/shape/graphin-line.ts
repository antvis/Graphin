// @ts-nocheck
import { Group } from '@antv/g-canvas';
import G6, { EdgeConfig } from '@antv/g6';

import { deepMix } from '@antv/util';
import { EdgeStyle } from '../typings/type';
import { setStatusStyle } from './utils';

export enum EnumNodeAndEdgeStatus {
  NORMAL = 'normal',
  SELECTED = 'selected',
  HOVERED = 'hovered',
  DISABLED = 'disabled',
}

export function removeDumpAttrs(attrs) {
  Object.keys(attrs).forEach(key => {
    if (attrs[key] === undefined) {
      delete attrs[key];
    }
  });
  return attrs;
}
export function parseLabel(json) {
  const { value, ...others } = json;
  const attrs = {
    id: 'label',
    x: 0,
    y: 0,
    text: value,
    ...others,
  };
  return removeDumpAttrs(attrs);
}

export function parseKeyShape(json) {
  const { ...others } = json;
  const attrs = {
    id: 'keyshape',
    ...others,
  };
  return removeDumpAttrs(attrs);
}

export function parseHalo(json) {
  const { ...others } = json;
  const attrs = {
    id: 'halo',
    ...others,
  };
  return removeDumpAttrs(attrs);
}

const parseAttr = (style, itemShapeName: string) => {
  if (itemShapeName === 'keyshape') {
    return parseKeyShape(style);
  }
  if (itemShapeName === 'halo') {
    return parseKeyShape(style);
  }
  if (itemShapeName === 'label') {
    return parseLabel(style);
  }
  return style;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default () => {
  G6.registerEdge('graphin-line', {
    draw(cfg: EdgeConfig, group: Group) {
      try {
        const style = deepMix({}, cfg.style) as EdgeStyle;
        /** 将初始化样式存储在model中 */

        // eslint-disable-next-line no-underscore-dangle
        cfg._initialStyle = { ...style };

        const { label, halo, keyshape: keyShapeStyle } = style;

        const hasLabel = label.value;
        const { startPoint, endPoint } = cfg;

        const d = (keyShapeStyle?.lineWidth || 1) + 1;
        // TODO:支持多边
        const path = [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ];

        /** 光环 */
        group.addShape('path', {
          attrs: {
            id: 'halo',
            path,
            lineWidth: keyShapeStyle.lineWidth + 10,
            ...halo,
          },
          draggable: true,
          name: 'halo',
          visible: false,
        });

        /** 主路径 */
        const key = group.addShape('path', {
          attrs: {
            id: 'keyshape',
            path,
            endArrow: {
              d: -d / 2,
              path: `M 0,0 L ${d},${d / 2} L ${d},-${d / 2} Z`,
            },
            ...keyShapeStyle,
          },
          draggable: true,
          name: 'keyshape',
        });

        /** 标签 */
        if (hasLabel) {
          const { value, ...others } = label;
          const labelShape = group.addShape('text', {
            attrs: {
              id: 'label',
              x: 0,
              y: 0,
              text: value,
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
      } catch (error) {
        console.error(error);
      }
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, item: EdgeConfig) {
      if (!name) return;
      const model = item.getModel() as EdgeConfig;
      const shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定
      const initStateStyle = deepMix({}, model.style.status);

      const initialStyle = item.getModel()._initialStyle as EdgeStyle;

      const status = item._cfg?.states || [];

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
