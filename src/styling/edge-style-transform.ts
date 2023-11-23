import { merge } from 'lodash-es';
import getEdgeStyleByTheme from '../theme/edge-style';
const { style: defaultStyle } = getEdgeStyleByTheme({
  primaryEdgeColor: '#ddd',
  edgeSize: 1,
  mode: 'light',
});

const transGraphinStyle = (style, otherStyles) => {
  const { keyshape, halo, label } = merge({}, defaultStyle, style || {}) as typeof defaultStyle;
  const { background } = label;
  //@ts-ignore  用户指定的优先级最高
  const { poly, loop } = keyshape;
  //@ts-ignore
  const { isMultiple, type, keyShape } = otherStyles;
  //@ts-ignore
  const { loopCfg, curveOffset } = keyShape || {};

  return {
    type: type || 'line-edge',
    keyShape: {
      opacity: keyshape.strokeOpacity, // 边主图形的透明度
      stroke: keyshape.stroke, // 边主图形描边颜色
      lineAppendWidth: keyshape.lineAppendWidth,
      lineWidth: keyshape.lineWidth,
      endArrow: {
        path: '',
      },
      ...(curveOffset ? { curveOffset: (poly && poly.distance) || curveOffset } : {}),
      ...(loopCfg ? { loopCfg: { dist: loop.distance || loopCfg.dist } } : {}),

      // ...(curveOffset ? { curveOffset } : {}),
      // ...(loopCfg ? { loopCfg } : {}),
    },
    // 边上的标签文本配置
    labelShape: {
      text: label.value,
      position: label.position,
      fill: label.fill,
      fontSize: label.fontSize,
      textAlign: label.textAlign,
      autoRotate: true, // 边上的标签文本根据边的方向旋转
      maxLines: '400%',
    },
    labelBackgroundShape: {
      radius: background.radius,
      fill: background.fill,
      stroke: background.stroke,
      opacity: background.opacity,
    },
    // 边的动画配置
    // animates: {
    //   // 数据/状态更新时
    //   update: [
    //     {
    //       shapeId: 'haloShape', // 背景光晕图形
    //       states: ['selected', 'active'], // 在 selected 和 active 状态变更时
    //     },
    //     {
    //       shapeId: 'keyShape', // 主图形
    //       states: ['selected', 'active'], // 在 selected 和 active 状态变更时
    //     },
    //   ],
    // },
  };
};

export const edgeStyleTransform = edge => {
  const { id, source, target, data, style } = edge;

  if (style) {
    const { type } = style;
    const IS_GRAPHIN = type === 'graphin-line' || !type;
    if (IS_GRAPHIN) {
      const { isMultiple, keyShape } = data;
      const displayData = transGraphinStyle(style, { isMultiple, keyShape, type: data.type });
      console.log('edge', edge, IS_GRAPHIN, displayData);
      return {
        id,
        source,
        target,
        data: displayData,
      };
    }
    return {
      id,
      source,
      target,
      data: {
        ...data,
        ...style,
      },
    };
  }

  return edge;
};
