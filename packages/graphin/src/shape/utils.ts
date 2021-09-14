import { isArray, isNumber } from '@antv/util';
import { NodeStyle } from '../typings/type';
/**
 *
 * @param shapes 元素组合的shape集合
 * @param statusStyle 该节点的样式：可以是状态激活样式，也可以是默认样式
 * @param parseAttr 将用户传递的JSON解析为G理解的Attr
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStatusStyle = (shapes: any, statusStyle: any, parseAttr: (style: any, shapeName: string) => any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!statusStyle) {
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shapes.forEach((shapeItem: any) => {
      const itemShapeName = shapeItem.cfg.name;
      const style = statusStyle[itemShapeName];
      if (style) {
        const { animate, visible, ...otherAttrs } = parseAttr(statusStyle, itemShapeName);
        // eslint-disable-next-line no-empty
        if (!shapeItem.attrs.img) {
          shapeItem.attr(otherAttrs);
          shapeItem.cfg.visible = visible !== false;
          if (animate) {
            const { attrs, ...animateOptions } = animate;
            shapeItem.animate(attrs, animateOptions);
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function removeDumpAttrs<T>(attrs: T): T {
  Object.keys(attrs).forEach(key => {
    // @ts-ignore
    if (attrs[key] === undefined) {
      // @ts-ignore
      delete attrs[key];
    }
  });
  return attrs;
}

/**
 * 将 size 转换为宽度和高度
 * @param size
 */
export const convertSizeToWH = (size: number | number[] | undefined) => {
  if (!size) return [0, 0];
  let width = 0;
  let height = 0;
  if (isNumber(size)) {
    width = size;
    height = size;
  } else if (isArray(size)) {
    if (size.length === 1) {
      const [w] = size;
      width = w;
      height = w;
    } else if (size.length === 2) {
      const [w, h] = size;
      width = w;
      height = h;
    }
  }
  return [width, height];
};

export const getLabelXYByPosition = (
  cfg: NodeStyle,
): {
  x: number;
  y: number;
  textBaseline?: 'top' | 'bottom';
} => {
  const { label, keyshape } = cfg;
  if (!keyshape?.size && !label?.offset) {
    return {
      // @ts-ignore
      x: undefined,
      // @ts-ignore
      y: undefined,
      // @ts-ignore
      textBaseline: label?.textBaseline,
    };
  }
  if (!keyshape?.size && label?.offset) {
    keyshape.size = 26; // 临时方案
    console.info('you should set keyshape.size when you update label position,the default keyshape size value is  26');
  }

  const { size } = keyshape;

  let offsetArray: number[] = [0, 0];
  const { position: labelPosition, offset = offsetArray } = label;
  if (typeof offset === 'number' || typeof offset === 'string') {
    offsetArray = [Number(offset), Number(offset)];
  }
  if ((offset as number[]).length > 0) {
    offsetArray = offset as number[];
  }

  const [offsetX, offsetY] = offsetArray;
  // 默认的位置（最可能的情形），所以放在最上面
  if (labelPosition === 'center') {
    return {
      x: 0 + offsetX,
      y: 0 + offsetY,
    };
  }
  const wh = convertSizeToWH(size);

  const width = wh[0];
  const height = wh[1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let positionAttrs: any;
  switch (labelPosition) {
    case 'top':
      positionAttrs = {
        x: 0 + offsetX,
        y: -height / 2 - offsetY,
        textBaseline: 'bottom', // 文本在图形的上面
      };
      break;
    case 'bottom':
      positionAttrs = {
        x: 0 + offsetX,
        y: height / 2 + offsetY,
        textBaseline: 'top',
      };
      break;
    case 'left':
      positionAttrs = {
        x: 0 - width - offsetX,
        y: 0 + offsetY,
        textAlign: 'right',
      };
      break;
    case 'right':
      positionAttrs = {
        x: 0 + width + offsetX,
        y: 0 + offsetY,
        textAlign: 'left',
      };
      break;
    default:
      positionAttrs = {
        x: 0 + offsetX,
        y: height / 2 + offsetY,
        textBaseline: 'top',
      };
      break;
  }
  return positionAttrs;
};

export const getBadgePosition = (position = 'RT', r: number) => {
  let badgeX = 0;
  let badgeY = 0;
  if (position === 'LT') {
    badgeX = r * Math.cos((Math.PI * 3) / 4);
    badgeY = -r * Math.sin((Math.PI * 3) / 4);
  } else if (position === 'LB') {
    // left bottom
    badgeX = r * Math.cos((Math.PI * 5) / 4);
    badgeY = -r * Math.sin((Math.PI * 5) / 4);
  } else if (position === 'RT') {
    // right top
    badgeX = r * Math.cos((Math.PI * 1) / 4);
    badgeY = -r * Math.sin((Math.PI * 1) / 4);
  } else if (position === 'RB') {
    // right bottom
    badgeX = r * Math.cos((Math.PI * 7) / 4);
    badgeY = -r * Math.sin((Math.PI * 7) / 4);
  }
  return {
    x: badgeX,
    y: badgeY,
  };
};
