import { IGroup } from '@antv/g-base';
import G6 from '@antv/g6';
import { isArray, isNumber, isObject } from '@antv/util';
import { INode, IItemBase } from '@antv/g6/lib/interface/item';
import { IUserNode, NodeStyle, NodeStatus } from '../typings/type';

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
    options: {
      style: {
        size: 60,
        fill: 'rgb(239, 244, 255)',
        stroke: 'rgb(95, 149, 255)',
        label: {
          position: 'bottom',
          value: '',
          fill: 'rgb(0, 0, 0)',
          fontSize: 12,
          offset: 0
        },
        icon: {
          type: 'image',
          value: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
          size: 20
        },
        badges: [
          {
            position: 'RT',
            type: 'text',
            value: '99+',
            size: [24, 16],
            fill: 'rgb(223, 234, 255)',
            stroke: '#4572d9',
            color: 'rgb(250, 250, 250)',
            fontSize: 12,
            padding: 0,
            offset: [0, 0]
          },
          {
            position: 'RB',
            type: 'text',
            value: 'LOCK',
            size: [48, 16],
            fill: 'rgb(223, 234, 255)',
            stroke: '#4572d9',
            color: 'rgb(250, 250, 250)',
            fontSize: 12,
            padding: 0,
            offset: [0, 0]
          }
        ]
      },
      status: {
        selected: {
          additionType: 'shadow',
          fill: 'rgb(255, 255, 255)',
          stroke: 'rgb(95, 149, 255)',
          lineWidth: 4,
          shadowColor: 'rgb(95, 149, 255)',
          shadowBlur: 10,
          'text-shape': {
            fontWeight: 500,
          },
        },
      }
    },
    draw(cfg: IUserNode, group: IGroup) {
      const style = Object.assign({}, cfg.style, this.options.style) as NodeStyle;
  
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
          r: r + 5,
          fill: '#2B384E',
          opacity: 0.9,
          lineWidth: 0,
        },
        name: 'hover-shape',
        visible: false,
      });
  
      // focus stroke for selected
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: r + 5,
          fill: 'rgb(95, 149, 255)',
          stroke: 'rgb(255, 255, 255)',
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
        const { value, fill, fontSize } = label
        if (value) {
          const labelPos = this.getLabelXYByPosition(style)
  
          group.addShape('text', {
            attrs: {
              x: labelPos.x,
              y: labelPos.y,
              fontSize,
              text: value,
              textAlign: 'center',
              fill,
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
              text: value,
              fontSize: 10,
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
  
      // badges 会存在多个的情况
      badges.forEach(badge => {
        const { type, position, value: badgeValue = '', 
          size: badgeSize, fill, stroke, color, 
          fontSize, fontFamily = 'graphin',
          padding = 0, offset = [0, 0] } = badge;
        let badgeX = 0;
        let badgeY = 0;
        
        // left top
        if (position === 'LT') {
          badgeX = r * Math.cos(Math.PI * 3 / 4);
          badgeY = -r * Math.sin(Math.PI * 3 / 4);
        } else if (position === 'LB') {
          // left bottom
          badgeX = r * Math.cos(Math.PI * 5 / 4);
          badgeY = -r * Math.sin(Math.PI * 5 / 4);
        } else if (position === 'RT') {
          // right top
          badgeX = r * Math.cos(Math.PI * 1 / 4);
          badgeY = -r * Math.sin(Math.PI * 1 / 4);
        } else if (position === 'RB') {
          // right bottom
          badgeX = r * Math.cos(Math.PI * 7 / 4);
          badgeY = -r * Math.sin(Math.PI * 7 / 4);
        }

        const [width, height] = convertSizeToWH(badgeSize);

        // 绘制 badge 的外层容器，根据宽度和高度确定是 circle 还是 rect

        let realX = badgeX
        let realY = badgeY
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
          realX = badgeX - width - padding * 2
          realY = badgeY - height - padding * 2
  
          if (position === 'LB') {
            realY = badgeY
          } else if (position === 'RT') {
            realX = badgeX
            realY = badgeY - height - padding * 2
          } else if (position === 'RB') {
            realX = badgeX
            realY = badgeY
          }

          realX += offset[0]
          realY += offset[1]
          group.addShape('rect', {
            attrs: {
              width: width + padding * 2,
              height: height + padding * 2,
              fill,
              stroke,
              x: realX,
              y: realY,
              radius: (height + padding * 2) / 3
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
              fontFamily: fontFamily,
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
      })
      
      return keyShape;
    },
    setState(name: string, value: string, item: INode) {
      debugger
      console.log(this.options.status)
      const group = item.get('group');
      const model = item.getModel();

      const status = Object.assign({}, this.options.status, model.status) as NodeStatus
      const currentStatus = status[name]

      
      if (name === 'hover') {
        const hoverShape = group.find((e: IItemBase) => e.get('name') === 'hover-shape');
        if (!hoverShape) return
        // const keyShape = item.getKeyShape();
        if (value) {
          hoverShape.show();
          // keyShape.attr('fill', colorSet.activeFill || '#314264'); // TODO: change according to the main color of the node
        }
        else {
          hoverShape.hide();
        }
      } else if (name === 'selected') {
        const selectedShape = group.find((e: IItemBase) => e.get('name') === 'selected-shape');

        if (!selectedShape) return

        const label = group.find((e: IItemBase) => e.get('name') === 'text-shape');
        const keyShape = item.getKeyShape();
        if (value) {
          selectedShape.show();
          // keyShape.attr('fill', colorSet.selectedFill || keyShapeStroke);
          keyShape.attr('fillOpacity', 1);
          label && label.attr('fontWeight', 800);
        }
        else {
          selectedShape.hide();
          // keyShape.attr('fill', colorSet.mainFill || '#2B384E');
          keyShape.attr('fillOpacity', 1);
          label && label.attr('fontWeight', 400);
        }
      }
    },
    getLabelXYByPosition(cfg: NodeStyle): {
      x: number;
      y: number;
      textBaseline?: string;
    } {
      const { label, size } = cfg
      const { position: labelPosition, offset = 0 } = label
  
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
      const { style } = cfg
      if (!style) return

      // 更新 keyShape 的样式
      const keyShape = item.getKeyShape();
      for(let key in style) {
        const value = (style as any)[key]
        if (value && !isObject(value)) {
          keyShape.attr(key, value)
        }

        // 更新 KeyShape 的大小
        if (key === 'size') {
          const sizeValue = convertSizeToWH(value)
          keyShape.attr('r', sizeValue[0] / 2)
        }
      }

      // 更新 label
      const { label, icon, badges = [] } = style
      if (label) {
        const { value, fill, fontSize  } = label
        const group = item.get('group')
        const itemLabel = group.find((element: IItemBase) => element.get('name') === 'circle-label')
        itemLabel.attr('text', value)
        itemLabel.attr('fill', fill)
        itemLabel.attr('fontSize', fontSize)

        // 更新 label 位置
        const labelPos = this.getLabelXYByPosition(style)
        for(let key in labelPos) {
          if (!labelPos[key]) return
          itemLabel.attr(key, labelPos[key])
        }
      }

      if (icon) {

      }

      if (badges.length > 0) {

      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}
