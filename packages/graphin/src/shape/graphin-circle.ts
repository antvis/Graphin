/* eslint-disable @typescript-eslint/no-explicit-any */
import G6, { INode } from '@antv/g6';
import { IGroup } from '@antv/g-base';

import { deepMix, isArray, isNumber } from '@antv/util';

import { IUserNode, NodeStyle } from '../typings/type';
import { setStatusStyle } from './utils';

function getRadiusBySize(size: number | number[] | undefined) {
  let r;
  if (isNumber(size)) {
    r = size / 2;
  } else if (isArray(size)) {
    r = size[0] / 2;
  }
  return r;
}

/**
 * 将 size 转换为宽度和高度
 * @param size
 */
const convertSizeToWH = (size: number | number[] | undefined) => {
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

/** 根据用户输入的json，解析成attr */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAttr = (
  schema: {
    type?: string;
    size?: number | number[];
    value?: any;
    [key: string]: any;
  },
  itemShapeName: string,
) => {
  const { type, size, value } = { ...schema };

  if (type === 'font') {
    schema.fontSize = size;
    schema.text = value;
  }

  if (itemShapeName === 'keyshape') {
    schema.r = getRadiusBySize(size);
  }
  if (itemShapeName === 'halo') {
    schema.r = getRadiusBySize(size);
  }
  if (itemShapeName === 'icon') {
    if (type === 'image') {
      const [width, height] = convertSizeToWH(size);
      schema.x = -width / 2;
      schema.y = -height / 2;
      schema.img = value;
      schema.width = width;
      schema.height = height;
      delete schema.fill; // 如果是图片类型，需要删除fill
    }
  }
  if (itemShapeName === 'label') {
    schema.text = value;
  }

  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
};

const getStyles = (defaultStyleCfg: any, cfgStyle: any) => {
  const { halo, keyshape } = { ...defaultStyleCfg, ...cfgStyle } as any;
  const nodeSize = convertSizeToWH(keyshape.size);
  /*  halo 默认样式单独处理* */
  const haloStyle = {
    halo: {
      x: 0,
      y: 0,
      r: nodeSize[0] / 2 + 17, // 默认 halo的样式和keyshape相关
      fill: keyshape.fill,
      visible: false,
      ...halo,
    },
  };

  return deepMix({}, defaultStyleCfg, haloStyle, cfgStyle) as NodeStyle;
};

export default () => {
  G6.registerNode('graphin-circle', {
    options: {
      style: {},
      status: {},
    },
    draw(cfg: IUserNode, group: IGroup) {
      const style = getStyles({}, cfg.style) as NodeStyle;
      /** 将初始化样式存储在model中 */
      cfg._initialStyle = { ...style };
      const { label, icon, badges = [], halo, keyshape: keyShapeStyle } = style;

      const r = getRadiusBySize(keyShapeStyle.size) as number;

      // halo for hover
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          ...halo,
        },
        name: 'halo',
        visible: false,
      });

      // keyshape
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r,
          cursor: 'pointer',
          ...keyShapeStyle,
        },
        name: 'keyshape',
        draggable: true,
      });

      // 文本
      if (label) {
        const { value, fill, fontSize } = label;
        if (value) {
          const labelPos = this.getLabelXYByPosition(style);
          group.addShape('text', {
            attrs: {
              x: labelPos.x,
              y: labelPos.y,
              fontSize,
              text: value,
              textAlign: 'center',
              fill,
              textBaseline: labelPos.textBaseline,
            },
            draggable: true,
            name: 'label',
          });
        }
      }

      // keyShape 中间的 icon
      if (icon) {
        const { type } = icon;
        if (type === 'text' || type === 'font') {
          const { value = '', fontFamily, fill, size } = icon;

          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              text: value,
              // @ts-ignore
              fontSize: size,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily,
              fill,
            },
            capture: false,
            name: 'icon',
          });
        } else if (type === 'image') {
          const { size: iconSize, value } = icon;
          const [width, height] = convertSizeToWH(iconSize);

          group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              img: value,
              width,
              height,
            },
            capture: false,
            name: 'icon',
          });
        }
      }

      // badges 会存在多个的情况
      badges.forEach((badge) => {
        const {
          type,
          position,
          value: badgeValue = '',
          size: badgeSize,
          fill,
          stroke,
          color,
          fontSize,
          fontFamily,
          padding = 0,
          offset: inputOffset = [0, 0],
        } = badge;
        let badgeX = 0;
        let badgeY = 0;

        const offset = convertSizeToWH(inputOffset);

        // left top
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

        const [width, height] = convertSizeToWH(badgeSize);

        // 绘制 badge 的外层容器，根据宽度和高度确定是 circle 还是 rect

        let realX = badgeX;
        let realY = badgeY;
        if (width === height) {
          group.addShape('circle', {
            attrs: {
              r: width / 2 + padding,
              fill,
              stroke,
              x: realX + offset[0],
              y: realY + offset[1],
            },
          });
        } else {
          realX = badgeX - width - padding * 2;
          realY = badgeY - height - padding * 2;

          if (position === 'LB') {
            realY = badgeY;
          } else if (position === 'RT') {
            realX = badgeX;
            realY = badgeY - height - padding * 2;
          } else if (position === 'RB') {
            realX = badgeX;
            realY = badgeY;
          }

          realX += offset[0];
          realY += offset[1];
          group.addShape('rect', {
            attrs: {
              width: width + padding * 2,
              height: height + padding * 2,
              fill,
              stroke,
              x: realX,
              y: realY,
              radius: (height + padding * 2) / 3,
              name: 'badges',
            },
          });
        }

        if (type === 'font' || type === 'text') {
          group.addShape('text', {
            attrs: {
              x: width !== height ? realX + width / 2 + padding : realX,
              y: width !== height ? realY + height / 2 + padding : realY,
              text: badgeValue,
              fontSize,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily,
              fill: color,
            },
            capture: false,
            name: 'badges',
          });
        } else if (type === 'image') {
          group.addShape('image', {
            attrs: {
              x: realX - width / 2,
              y: realX - height / 2,
              width,
              height,
              img: badgeValue,
            },
            capture: false,
            name: 'badges',
          });
        }
      });

      return keyShape;
    },
    setState(name: string, value: string, item: INode) {
      if (!name) return;
      const model = item.getModel() as any;
      const shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定
      const initStateStyle = deepMix({}, model.style.status);
      const initialStyle = item.getModel()._initialStyle as any;
      const status = item._cfg?.states || [];

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

    getLabelXYByPosition(
      cfg: NodeStyle,
    ): {
      x: number;
      y: number;
      textBaseline?: string;
    } {
      const { label, keyshape } = cfg;

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
        return { x: 0, y: 0 };
      }
      const wh = convertSizeToWH(size);

      const width = wh[0];
      const height = wh[1];

      let style: any;
      switch (labelPosition) {
        case 'top':
          style = {
            x: 0 + offsetX,
            y: -height / 2 - offsetY,
            textBaseline: 'bottom', // 文本在图形的上面
          };
          break;
        case 'bottom':
          style = {
            x: 0 + offsetX,
            y: height / 2 + offsetY,
            textBaseline: 'top',
          };
          break;
        case 'left':
          style = {
            x: 0 - width - offsetX,
            y: 0 + offsetY,
            textAlign: 'right',
          };
          break;
        default:
          style = {
            x: width + offsetX,
            y: 0 + offsetY,
            textAlign: 'left',
          };
          break;
      }
      return style;
    },
    update(cfg: IUserNode, item: INode) {
      if (!cfg.style) return;
      try {
        const style = getStyles(cfg._initialStyle, cfg.style) as NodeStyle;
        cfg._initialStyle = { ...style };
        const shapes = item.getContainer().get('children');
        setStatusStyle(shapes, style, parseAttr);
      } catch (error) {
        console.error('error');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
