import { IGroup, BBox } from '@antv/g-base';
import { INode } from '@antv/g6/lib/interface/item';
import G6 from '@antv/g6';
import { IUserNode } from '../typings/type';
import iconFont from '../icons/iconFont';
import { isArray, isNumber } from '@antv/util';
import { getTextSize } from '@antv/g6/lib/util/graphic';

const defaultNodeStyle = {
  size: 16,
  fill: '',
  stroke: '',
  label: {
    value: '',
    fill: ''
  }
}

const DEFAULT_ICON_FONT_FAMILY = 'graphin';

const convertSizeToWH = (size: number | number[]) => {
  let width = 0
  let height = 0
  if (isNumber(size)) {
    width = size;
    height = size
  } else if (isArray(size)) {
    if (size.length === 1) {
      width = size[0]
      height = size[0]
    } else if (size.length === 2) {
      width = size[0]
      height = size[1]
    }
  }
  return [width, height]
}

export default (g6: typeof G6) => {
  g6.registerNode('graphin-circle', {
    draw(cfg: IUserNode, group: IGroup) {
      // const { style } = cfg
      const style = Object.assign({}, defaultNodeStyle, cfg.style)
      // const innerNodeSize = style.size || 48;

      const { fill, stroke, size, label, icon, badge } = style

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
          lineWidth: 0
        },
        name: 'halo-shape',
        visible: false
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
          lineWidth: 1
        },
        name: 'selected-shape',
        visible: false
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
          group.addShape('text', {
            attrs: {
              id: 'circle-label',
              x: 0,
              y: r / 2 + 14,
              fontSize: 12,
              text: cfg.label,
              textAlign: 'center',
              fill: label.fill,
            },
            draggable: true,
            name: 'circle-label',
          });
        }
      }

      // keyShape 中间的 icon
      if (icon) {
        const { type } = icon
        if (type === 'text' || type === 'font') {
          const { value, fontFamily = DEFAULT_ICON_FONT_FAMILY, fill } = icon
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              text: iconFont(value, fontFamily),
              fontSize: 20,
              textAlign: 'center',
              textBaseline: 'middle',
              fontFamily: fontFamily,
              fill
            },
            capture: false,
            name: 'circle-icon',
          });
        } else if (type === 'image') {
          const { size: iconSize, value } = icon
          const [width, height] = convertSizeToWH(iconSize)

          group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              img: value
            },
            capture: false,
            name: 'circle-icon',
          });
        }
      }

      
      if (badge) {
        const { type, position, value: badgeValue, size: badgeSize, fill, stroke, color, fontSize, fontFamily } = badge
        let badgeX = 0
        let badgeY = 0
        const bbox: BBox = keyShape.getBBox()
        // left top
        if (position === 'LT') {
          badgeX = bbox.minX
          badgeY = bbox.minY
        } else if (position === 'LB') {
          // left bottom
          badgeX = bbox.minX
          badgeY = bbox.maxY
        } else if (position === 'RT') {
          // right top
          badgeX = bbox.maxX
          badgeY = bbox.minY
        } else if (position === 'RB') {
          // right bottom
          badgeX = bbox.maxX
          badgeY = bbox.maxY
        }

        const [width, height] = convertSizeToWH(badgeSize)
        let textLen = 0
        if (type === 'font' || type === 'text') {
          // 获取 badge 上文本的长度
          textLen = getTextSize(badgeValue, fontSize)[0]

          if (width === height) {
            group.addShape('circle', {
              attrs: {
                r: textLen / 2,
                fill,
                stroke,
                x: badgeX,
                y: badgeY
              }
            })
          } else {
            group.addShape('rect', {
              attrs: {
                width: textLen,
                height,
                fill,
                stroke,
                x: badgeX,
                y: badgeY
              }
            })
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
              fill
            },
            capture: false,
            name: 'circle-badge',
          });
        } else if (type === 'image') {
          textLen = width > height ? width : height
          group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              img: badgeValue
            },
            capture: false,
            name: 'circle-badge',
          });
        }
      }
      return keyShape;
    },
    setState(name: string, value: string, item: INode) {
     
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
