import { IGroup } from '@antv/g-base';
import G6, { INode, IItemBase } from '@antv/g6';
import { deepMix, isArray, isNumber, isObject } from '@antv/util';
import hexToRgba from '../utils/hexToRgba';

import { IUserNode, NodeStyle } from '../typings/type';

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
      width = size[0];
      height = size[0];
    } else if (size.length === 2) {
      width = size[0];
      height = size[1];
    }
  }
  return [width, height];
};

const NodeSize = 36;

const primaryColor = '#FF6A00';

const Color = {
  fill: hexToRgba(primaryColor, '0.1'),
  stroke: primaryColor,
  icon: '#fff',
  badge: {
    fill: primaryColor,
    stroke: primaryColor,
    font: '#fff',
  },
};

const defaultStyle = {
  keyshape: {
    size: NodeSize,
    fill: Color.fill,
    stroke: Color.stroke,
    lineWidth: 1,
    opacity: 1,
  },
  label: {
    position: 'bottom',
    value: '',
    fill: 'rgb(0, 0, 0)',
    fontSize: 12,
    offset: 0,
  },
  icon: {
    type: 'text',
    value: '',
    size: NodeSize,
    fill: Color.icon,
  },
  badges: [],
  halo: {
    r: NodeSize + NodeSize / 12,
    fill: Color.fill,
    lineWidth: 1,
    opacity: 0.9,
    visible: false,
  },
};

/** 根据用户输入的json，解析成attr */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paserAttr = (
  schema: {
    type?: string;
    size?: number | [number, number];
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
  if (type === 'image') {
    const [width, height] = convertSizeToWH(size);
    schema.x = -width / 2;
    schema.y = -height / 2;
    schema.img = value;
    schema.width = width;
    schema.height = height;
  }
  if (itemShapeName === 'keyshape') {
    schema.r = getRadiusBySize(size);
  }

  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
};

const defaultStatusStyle = {
  selected: {
    halo: {
      visible: true,
    },
    keyshape: {
      lineWidth: 5,
    },

    //  // 这里需要特殊处理
    //  keyshape: {
    //   size: [80, 80],
    // },
    // icon: {
    //   type: 'font',
    //   size: 40,
    // },
  },
  hover: {
    halo: {
      visible: true,
    },
  },
  active: {
    halo: {
      visible: true,
    },
  },
  inactive: {
    halo: {
      visible: true,
    },
  },
};

function getRadiusBySize(size: number | [number] | [number, number] | undefined) {
  let r;
  if (isNumber(size)) {
    r = size / 2;
  } else if (isArray(size)) {
    r = size[0] / 2;
  }
  return r;
}
const getStyles = (defaultStyle: any, cfgStyle: any) => {
  const keyShapeStyle = {
    ...defaultStyle.keyshape,
    ...cfgStyle.keyshape,
  };
  const { size, fill } = keyShapeStyle;
  const nodeSize = convertSizeToWH(size);
  /*  halo 默认样式单独处理**/
  const haloStyle = {
    halo: {
      x: 0,
      y: 0,
      r: nodeSize[0] / 2 + 15,
      fill: fill,
      lineWidth: 1,
      opacity: 0.9,
      visible: false,
    },
  };
  return deepMix({}, defaultStyle, haloStyle, cfgStyle) as NodeStyle;
};
export default () => {
  const defaultStyleMap: any = {};
  G6.registerNode('graphin-circle', {
    options: {
      style: defaultStyle,
      status: defaultStatusStyle,
    },
    draw(cfg: IUserNode, group: IGroup) {
      const style = getStyles(this.options.style, cfg.style) as NodeStyle;
      defaultStyleMap[cfg.id] = {
        ...style,
      };

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
      badges.forEach(badge => {
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
          offset = [0, 0],
        } = badge;
        let badgeX = 0;
        let badgeY = 0;

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
            name: 'circle-badge-content',
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
            name: 'circle-badge-content',
          });
        }
      });

      return keyShape;
    },
    setState(name: string, value: string, item: INode) {
      if (!name) return;
      const model = item.getModel();
      // const originStyles = { ...model.style } as any;

      const shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定
      const initStateStyle = deepMix({}, this.options.status, model.statusStyle);

      console.log(defaultStyleMap);

      const setStatusStyle = (statusKey: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shapes.forEach((g6Shape: any) => {
          const itemShapeName = g6Shape.cfg.name;
          const customAttrs = initStateStyle[statusKey][itemShapeName];
          if (customAttrs) {
            const { animate, visible, ...otherAttrs } = paserAttr(customAttrs, itemShapeName);
            g6Shape.attr(otherAttrs);
            g6Shape.cfg.visible = visible !== false;
            if (animate) {
              const { attrs, duration, easing, callback, delay } = animate;
              g6Shape.animate(attrs, duration, easing, callback, delay);
            }
          }
        });
      };
      const resetStatusStyle = (id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shapes.forEach((g6Shape: any) => {
          const itemShapeName = g6Shape.cfg.name;
          const orgiinStyle = defaultStyleMap[id as string][itemShapeName];
          if (orgiinStyle) {
            const { animate, visible, ...otherAttrs } = paserAttr(orgiinStyle, itemShapeName);
            g6Shape.attr(otherAttrs);
            g6Shape.cfg.visible = visible !== false;
            if (animate) {
              const { attrs, duration, easing, callback, delay } = animate;
              g6Shape.animate(attrs, duration, easing, callback, delay);
            }
          }
        });
      };

      const status = item._cfg?.states || [];
      try {
        Object.keys(initStateStyle).forEach(key => {
          if (name === key) {
            if (value) {
              setStatusStyle(key); // 匹配到status就改变
            } else {
              resetStatusStyle(model.id as string); //没匹配到就重置

              status.forEach(statusKey => {
                // 如果cfg.status中还有其他状态，那就重新设置回来
                setStatusStyle(statusKey);
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
      const { position: labelPosition, offset = 0 } = label;

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
            x: 0,
            y: 0 - height / 2 - offset,
            textBaseline: 'bottom', // 文本在图形的上面
          };
          break;
        case 'bottom':
          style = {
            x: 0,
            y: height / 2 + offset,
            textBaseline: 'top',
          };
          break;
        case 'left':
          style = {
            x: 0 - width / 2 - offset,
            y: 0,
            textAlign: 'right',
          };
          break;
        default:
          style = {
            x: width / 2 + offset,
            y: 0,
            textAlign: 'left',
          };
          break;
      }
      return style;
    },
    update(cfg: IUserNode, item: INode) {
      if (!cfg.style) return;

      const style = getStyles(this.options.style, cfg.style) as NodeStyle;
      defaultStyleMap[cfg.id] = {
        ...style,
      };

      // 更新 keyShape 的样式
      const keyShape = item.getKeyShape();
      for (const key in style) {
        const value = (style as any)[key];
        if (value && !isObject(value)) {
          keyShape.attr(key, value);
        }

        // 更新 KeyShape 的大小
        if (key === 'size') {
          const sizeValue = convertSizeToWH(value);
          keyShape.attr('r', sizeValue[0] / 2);
        }
      }

      // 更新 label
      const { label, icon, badges = [] } = style;
      if (label) {
        const { value, fill, fontSize } = label;
        const group = item.get('group');
        const itemLabel = group.find((element: IItemBase) => element.get('name') === 'label');
        itemLabel.attr('text', value);
        itemLabel.attr('fill', fill);
        itemLabel.attr('fontSize', fontSize);

        // 更新 label 位置
        const labelPos = this.getLabelXYByPosition(style);
        for (const key in labelPos) {
          if (!labelPos[key]) return;
          itemLabel.attr(key, labelPos[key]);
        }
      }

      if (icon) {
      }

      if (badges.length > 0) {
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
