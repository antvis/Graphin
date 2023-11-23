import { merge } from 'lodash-es';
import getNodeStyleByTheme from '../theme/node-style';
const { style: defaultStyle } = getNodeStyleByTheme({
  primaryColor: '#873af4',
  nodeSize: 26,
  mode: 'light',
});

const transGraphinStyle = style => {
  const { keyshape, halo, icon, label, badges } = merge({}, defaultStyle, style || {}) as typeof defaultStyle;
  let iconShape: any = {
    visible: false,
    text: '',
  };
  if (icon.type === 'image') {
    iconShape = {
      fill: 'transparent',
      r: [keyshape.size, keyshape.size],
      clip: { r: keyshape.size / 2 },
      img: icon.value,
      visible: true,
    };
  }
  if (icon.type === 'font') {
    iconShape = {
      fontSize: keyshape.size / 2,
      fontFamily: 'iconfont',
      text: icon.value || '',
      //@ts-ignore
      fill: icon.fill || keyshape.fill,
      visible: true,
    };
  }
  if (icon.type === 'text') {
    iconShape = {
      fontSize: keyshape.size / 2,
      fill: '#fff',
      text: icon.value,
      visible: true,
    };
  }
  console.log('iconShape', iconShape, icon, style);

  return {
    type: 'circle-node',
    labelShape: {
      text: label.value,
      position: label.position,
      fill: label.fill,
      fillOpacity: label.fillOpacity,
      fontSize: label.fontSize,
      offset: label.offset,
      maxWidth: '500%',
    },
    keyShape: {
      r: keyshape.size / 2,
      fill: keyshape.fill,
      stroke: keyshape.stroke,
      strokeOpacity: keyshape.strokeOpacity,
      opacity: keyshape.opacity,
      fillOpacity: keyshape.fillOpacity,
      lineWidth: keyshape.lineWidth,
    },
    iconShape,
    animates: {
      update: [
        {
          fields: ['x', 'y'],
          shapeId: 'group',
        },
      ],
    },
  };
};

export const nodeStyleTransform = node => {
  const { id, data, style } = node;

  const { x = 0, y = 0, z = 0 } = data;

  if (style) {
    const { type } = style;
    const IS_GRAPHIN = !type || type === 'graphin-circle';
    if (IS_GRAPHIN) {
      return {
        id,
        data: {
          x,
          y,
          z,
          ...transGraphinStyle(style),
        },
      };
    }
    return {
      id,
      data: {
        x,
        y,
        z,
        ...style,
      },
    };
  }
  return node;
};
