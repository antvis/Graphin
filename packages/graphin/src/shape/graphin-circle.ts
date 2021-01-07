import { IGroup } from '@antv/g-base';
import G6, { INode, IItemBase } from '@antv/g6';
import { deepMix, isArray, isNumber, isObject } from '@antv/util';

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

const AlibabaColor = '#FF6A00';
const AntColor = '#3D2D70';
const NodeSize = 24;

export default () => {
  G6.registerNode('graphin-circle', {
    options: {
      style: {
        size: NodeSize,
        fill: 'rgb(239, 244, 255)',
        stroke: AntColor,
        opacity: 1,
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
        },
        badges: [
          // {
          //   position: 'RT',
          //   type: 'text',
          //   value: '99+',
          //   size: [24, 24],
          //   fill: 'rgb(223, 234, 255)',
          //   stroke: '#4572d9',
          //   color: 'rgb(250, 250, 250)',
          //   fontSize: 12,
          //   padding: 0,
          //   offset: [0, 0],
          // },
          // {
          //   position: 'LB',
          //   type: 'text',
          //   value: 'LOCK',
          //   size: [48, 16],
          //   fill: 'rgb(223, 234, 255)',
          //   stroke: '#4572d9',
          //   color: 'rgb(250, 250, 250)',
          //   fontSize: 12,
          //   padding: 0,
          //   offset: [0, 0],
          // },
        ],
      },
      status: {
        selected: {
          // shadowColor: 'rgb(95, 149, 255)',
          // shadowBlur: 30,
          // additionType: 'border',
          // additionStyle: {
          //   fill: 'rgb(239, 244, 255)',
          //   stroke: '#6C43D5',
          //   lineWidth: 3,
          // },
          additionType: 'shadow',
          additionStyle: {
            fill: 'rgb(239, 244, 255)',
          },
        },
        hover: {
          additionType: 'shadow',
          additionStyle: {
            fill: 'rgb(239, 244, 255)',
          },
        },
      },
    },
    draw(cfg: IUserNode, group: IGroup) {
      const style = deepMix({}, this.options.style, cfg.style) as NodeStyle;

      const { fill, stroke, size, label, icon, badges = [] } = style;

      let r = 0;
      if (isNumber(size)) {
        r = size / 2;
      } else if (isArray(size)) {
        r = size[0] / 2;
      }

      // halo for hover
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: r + 17,
          fill: '#2B384E',
          opacity: 0.9,
          lineWidth: 1,
        },
        name: 'border-shape',
        visible: false,
      });

      // focus stroke for selected
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: r + 16,
          fill: 'rgb(239, 244, 255)',
          lineWidth: 1,
        },
        name: 'shadow-shape',
        visible: false,
      });

      // keyshape
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r,
          stroke,
          fill,
          lineWidth: 2,
        },
        name: 'circle-keyshape',
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
            name: 'circle-label',
          });
        }
      }

      // keyShape 中间的 icon
      if (icon) {
        const { type } = icon;
        if (type === 'text' || type === 'font') {
          const { value = '', fontFamily, fill: IconFill, size: IconSize } = icon;

          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              text: value,
              // @ts-ignore
              fontSize: IconSize,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily,
              fill: IconFill,
            },
            capture: false,
            name: 'circle-icon',
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
            name: 'circle-icon',
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
          fontFamily = 'graphin',
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
      const group = item.get('group');
      const model = item.getModel();

      let currentStatusStyle; // status[name]

      // 如果 model.status 不存在，或值为 true，则取默认的状态样式
      // @ts-ignore
      if (!model.status || model.status[name]) {
        currentStatusStyle = this.options.status[name];
      }

      if (!currentStatusStyle) return;

      const { fill, stroke, opacity, shadowColor, shadowBlur, additionType, additionStyle } = currentStatusStyle;
      const keyShape = item.getKeyShape();

      let keyShapeAttrs = {} as any;
      if (value) {
        // 当设置状态时候，keyShape 取 status 中的值
        if (fill) {
          keyShapeAttrs.fill = fill;
        }
        if (stroke) {
          keyShapeAttrs.stroke = stroke;
        }
        if (opacity) {
          keyShapeAttrs.opacity = opacity;
        }
        if (shadowColor) {
          keyShapeAttrs.shadowColor = shadowColor;
        }
        if (shadowBlur) {
          keyShapeAttrs.shadowBlur = shadowBlur;
        }
      } else {
        // 当取消状态时，还原 keyShape 的样式，取 style 里面的值
        const keyShapeStyle = this.options.style;
        const {
          fill: originFill,
          stroke: originStroke,
          opacity: originOpacity,
          shadowColor: originShadowColor,
          shadowBlur: originShadowBlur,
        } = keyShapeStyle;
        keyShapeAttrs = {
          fill: originFill,
          stroke: originStroke,
          opacity: originOpacity,
          shadowColor: originShadowColor,
          shadowBlur: originShadowBlur,
        };
      }

      for (const key in keyShapeAttrs) {
        keyShape.attr(key, keyShapeAttrs[key]);
      }

      let additionShapeName = '';
      if (additionType === 'shadow') {
        additionShapeName = 'shadow-shape';
      } else if (additionType === 'border') {
        additionShapeName = 'border-shape';
      }

      if (name === 'hover') {
        const hoverShape = group.find((e: IItemBase) => e.get('name') === additionShapeName);
        if (!hoverShape) return;
        if (value) {
          hoverShape.show();
          for (const styleKey in additionStyle) {
            hoverShape.attr(styleKey, additionStyle[styleKey]);
          }
        } else {
          hoverShape.hide();
        }
      } else if (name === 'selected') {
        const selectedShape = group.find((e: IItemBase) => e.get('name') === additionShapeName);

        if (!selectedShape) return;

        const label = group.find((e: IItemBase) => e.get('name') === 'text-shape');

        if (value) {
          selectedShape.show();
          for (const styleKey in additionStyle) {
            selectedShape.attr(styleKey, additionStyle[styleKey]);
          }
          label && label.attr('fontWeight', 800);
        } else {
          selectedShape.hide();
          label && label.attr('fontWeight', 400);
        }
      }
    },
    getLabelXYByPosition(
      cfg: NodeStyle,
    ): {
      x: number;
      y: number;
      textBaseline?: string;
    } {
      const { label, size } = cfg;
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
      const { style } = cfg;
      if (!style) return;

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
        const itemLabel = group.find((element: IItemBase) => element.get('name') === 'circle-label');
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
