import G6, { IGroup, IShape, IEdge } from '@antv/g6';
import { isString } from '@antv/util';

import { IUserEdge } from '../typings/type';

export default () => {
  G6.registerEdge(
    'graphin-line',
    {
      options: {
        style: {
          stroke: 'rgb(239, 244, 255)',
          opacity: 1,
          labelCfg: {
            fill: 'rgb(0, 0, 0)',
            fontSize: 12,
          },
        },
        status: {
          selected: {
            fill: 'rgb(239, 244, 255)',
          },
          hover: {
            fill: 'rgb(239, 244, 255)',
          },
        },
      },

      afterDraw(cfg: IUserEdge, group: IGroup, keyShape: IShape) {
        const path = keyShape.attr('path');
        const lineWidth = keyShape.attr('lineWidth');
        const shape = group.addShape('path', {
          attrs: {
            path,
            lineWidth: lineWidth * 10,
            // opacity: 0.1,
            stroke: 'rgb(239, 244, 255)',
          },
          name: 'external-shape',
          visible: false,
        });
        shape.toBack();
      },

      setState(name: string, value: string, item: IEdge) {
        const keyShape = item.getKeyShape();
        const group = item.get('group');
        const model = item.getModel() as IUserEdge;
        const children = group.get('children');
        if (!model.status || !model.status[name]) return;

        const shape = children.find((element: any) => element.get('name') === 'external-shape');
        if (value) {
          // selected 状态显示边上的 shape
          if (name === 'selected') {
            shape.show();
          }

          // 是否有配置动画
          const { animation, ...otherAttr } = model.status[name];
          for (let key in otherAttr) {
            const value = (otherAttr as any)[key];
            keyShape.attr(key, value);
          }

          if (animation) {
            const { delay = 0, duration = 3000, easing = 'easeLinear', repeat = true } = animation;
            let index = 0;
            keyShape.animate(
              () => {
                index++;
                if (index > 9) {
                  index = 0;
                }

                const conf = {
                  lineDash: [3, 3],
                  lineDashOffset: -index,
                };

                return conf;
              },
              {
                easing,
                delay,
                repeat,
                duration,
              },
            );
          }
        } else {
          shape.hide();
          keyShape.stopAnimate();
          keyShape.attr('lineDash', null);

          // 恢复到原来的样式
          const originStyle = item.getOriginStyle() as any;
          for (let key in originStyle) {
            const currentShape = children.find((element: any) => element.get('name') === key);
            if (currentShape) {
              for (let value in originStyle[key]) {
                const currentValue = originStyle[key][value];
                if (isString(currentValue)) {
                  currentShape.attr(value, currentValue);
                }
              }
            }
          }
        }
      },
      afterUpdate(cfg: IUserEdge, item: IEdge) {
        const keyShape = item.getKeyShape();
        const group = item.get('group');
        const shape = group.get('children').find((element: any) => element.get('name') === 'external-shape');
        if (shape) {
          shape.attr('path', keyShape.attr('path'));
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    'line',
  );
};
