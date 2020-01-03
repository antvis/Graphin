/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import hexToRgba from '../../utils/hexToRgba';
import { Item } from '@antv/g6';
import { G } from '@antv/g6/types/g';

const reset = (shape: G.Shape, initStyle: G.Attrs) => {
  const { lineWidth, stroke } = initStyle;
  shape.stopAnimate();
  shape.attr('lineWidth', lineWidth);
  shape.attr('stroke', stroke);
};

// eslint-disable-next-line
const cache = (model: any) => {
  if (!model.initStyle) {
    model.initStyle = model.style;
  }
  return model.initStyle;
};

export default (name: string, value: string, item: Item) => {
  const group = item.getContainer();
  const shape = group.get('children')[0]; // 顺序根据 draw 时确定
  const textShape = group.get('children')[1];
  const model = item.get('model');
  /** 设置缓存 */
  const initStyle = cache(model);

  /** 如果是false，则直接reset到初始状态 */
  if (!value || !name) {
    reset(shape, initStyle);
    if (textShape) {
      textShape.originFill = textShape.originFill || textShape._attrs.fillStyle;
      textShape.attr('fill', textShape.originFill);
    }
    return;
  }
  /** 状态设置 */
  const { lineWidth, stroke } = initStyle;
  if (name === 'selected') {
    shape.attr('lineWidth', 5);
    shape.attr('stroke', '#1890FF');
    shape.animate(
      {
        lineWidth: lineWidth + 3,
        repeat: false, // 循环
      },
      200,
      'easeCubic',
      null,
      0,
    );
  }

  if (name === 'highlight.light') {
    shape.attr('lineWidth', 3);
  }
  if (name === 'highlight.dark') {
    if (textShape) {
      textShape.originFill = textShape.originFill || textShape._attrs.fillStyle;
      textShape.attr('fill', '#ccc');
    }
    shape.attr('lineWidth', 1);
    shape.attr('stroke', hexToRgba(stroke, '0.1'));
  }
};
