import { IGroup, BBox } from '@antv/g-base';
import { INode } from '@antv/g6/lib/interface/item';
import G6 from '@antv/g6';
import { IUserNode, NodeStyle } from '../typings/type';
import iconFont from '../icons/iconFont';
import { isArray, isNumber } from '@antv/util';
import { getTextSize } from '@antv/g6/lib/util/graphic';

const defaultNodeStyle = {
  size: 16,
  fill: 'red',
  stroke: 'blue',
  label: {
    value: 'xxx',
    fill: 'green',
  },
};

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

export default () => {
  G6.registerNode('graphin-circle', {
    draw(cfg: IUserNode, group: IGroup) {
      debugger
      const style = Object.assign({}, defaultNodeStyle, cfg.style);
  
      const { fill, stroke, size, label, icon, badge } = style;
  
      let r = 30;
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
          r: r + 5,
          fill: '#2B384E',
          opacity: 0.9,
          lineWidth: 0,
        },
        name: 'halo-shape',
        visible: false,
      });
  
      // focus stroke for selected
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: r + 5,
          fill: '#2B384E',
          stroke: '#fff',
          strokeOpacity: 0.85,
          lineWidth: 1,
        },
        name: 'selected-shape',
        visible: false,
      });
  
      // keyshape
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: r / 2,
          stroke,
          fill,
          lineWidth: 2,
        },
        name: 'circle-keyshape',
        draggable: true,
      });
  
      // 文本
      if (label) {
        if (label.value) {
          const labelPos = this.getLabelXYByPosition(style)
  
          group.addShape('text', {
            attrs: {
              id: 'circle-label',
              x: labelPos.x,
              y: labelPos.y,
              fontSize: 12,
              text: label.value,
              textAlign: 'center',
              fill: label.fill,
              textBaseline: labelPos.textBaseline
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
          const { value = '', fontFamily, fill } = icon;
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              text: fontFamily ? iconFont(value, fontFamily) : value,
              fontSize: 20,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily: fontFamily,
              fill,
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
              height
            },
            capture: false,
            name: 'circle-icon',
          });
        }
      }
  
      if (badge) {
        const { type, position, value: badgeValue = '', size: badgeSize, fill, stroke, color, fontSize, fontFamily = 'graphin' } = badge;
        let badgeX = 0;
        let badgeY = 0;
        const bbox: BBox = keyShape.getBBox();
        // left top
        if (position === 'LT') {
          badgeX = bbox.minX;
          badgeY = bbox.minY;
        } else if (position === 'LB') {
          // left bottom
          badgeX = bbox.minX;
          badgeY = bbox.maxY;
        } else if (position === 'RT') {
          // right top
          badgeX = bbox.maxX;
          badgeY = bbox.minY;
        } else if (position === 'RB') {
          // right bottom
          badgeX = bbox.maxX;
          badgeY = bbox.maxY;
        }
  
        const [width, height] = convertSizeToWH(badgeSize);
        let textLen = 0;
        if (type === 'font' || type === 'text') {
          // 获取 badge 上文本的长度
          textLen = getTextSize(badgeValue, fontSize)[0];
  
          if (width === height) {
            group.addShape('circle', {
              attrs: {
                r: textLen / 2,
                fill,
                stroke,
                x: badgeX,
                y: badgeY,
              },
            });
          } else {
            group.addShape('rect', {
              attrs: {
                width: textLen,
                height,
                fill,
                stroke,
                x: badgeX,
                y: badgeY,
              },
            });
          }
  
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              text: iconFont(badgeValue as string, fontFamily),
              fontSize: 20,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily: fontFamily,
              fill,
            },
            capture: false,
            name: 'circle-badge',
          });
        } else if (type === 'image') {
          textLen = width > height ? width : height;
          group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              img: badgeValue,
            },
            capture: false,
            name: 'circle-badge',
          });
        }
      }
      return keyShape;
    },
    setState(name: string, value: string, item: INode) {},
    getLabelXYByPosition(cfg: NodeStyle): {
      x: number;
      y: number;
      textBaseline?: string;
    } {
      const { label, size } = cfg
      const { position: labelPosition, value, offset = 0 } = label
  
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}
