/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroup, ShapeCfg } from '@antv/g-base';
import G6, { INode } from '@antv/g6';
import { deepMix, isArray, isNumber } from '@antv/util';
import { getDefaultStyleByTheme } from '../theme';
import { IUserNode, NodeStyle } from '../typings/type';
import { convertSizeToWH, getBadgePosition, getLabelXYByPosition, removeDumpAttrs, setStatusStyle } from './utils';

function getRadiusBySize(size: number | number[] | undefined) {
  let r;
  if (isNumber(size)) {
    r = size / 2;
  } else if (isArray(size)) {
    r = size[0] / 2;
  }
  return r;
}

const getStyleByTheme = (theme = {}) => {
  const themeResult = getDefaultStyleByTheme(theme);
  const { defaultNodeStyle, defaultNodeStatusStyle } = themeResult;
  return {
    style: defaultNodeStyle.style,
    status: defaultNodeStatusStyle.status,
  };
};

/**
 * @description 解析Halo
 * @param config 用户输入的数据
 */
const parseHalo = (style: NodeStyle) => {
  const { halo, keyshape } = style;

  const { size, visible, fill, fillOpacity, ...otherAttrs } = halo;

  const haloR = getRadiusBySize(size);

  let keyshapeR: undefined | number;
  let keyshapeFill: undefined | string;
  let keyshapeStroke: undefined | string;

  if (keyshape && keyshape.size) {
    const calculateR = getRadiusBySize(keyshape.size) as number;
    keyshapeR = calculateR + 15;
  }
  if (keyshape && keyshape.fill) {
    keyshapeFill = keyshape.fill;
  }
  if (keyshape && keyshape.stroke) {
    keyshapeStroke = keyshape.stroke;
  }

  const attrs = {
    x: 0,
    y: 0,
    r: haloR || keyshapeR, // 默认 halo的样式和keyshape相关
    fill: fill || keyshapeFill || keyshapeStroke,
    fillOpacity: fillOpacity || 0.1,
    visible: visible !== false,
    ...otherAttrs,
  };
  return {
    name: 'halo',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs),
  };
};

const parseKeyshape = (style: NodeStyle) => {
  const { keyshape } = style;
  const { size, visible, stroke, fill, fillOpacity, strokeOpacity, ...otherAttrs } = keyshape;

  const r = getRadiusBySize(size);
  const attrs = {
    x: 0,
    y: 0,
    r,
    cursor: 'pointer',
    visible: visible !== false,
    stroke,
    strokeOpacity: strokeOpacity || 1,
    fill: fill || stroke,
    fillOpacity: fillOpacity || 0.2,
    ...otherAttrs,
  };
  return {
    name: 'keyshape',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs),
  };
};

export type TextAlignType = 'center';
const parseLabel = (style: NodeStyle) => {
  const { label } = style;

  const { value, fill, fontSize, visible, ...otherAttrs } = label;
  // @ts-ignore
  const labelPos = getLabelXYByPosition(style);

  const attrs = {
    x: labelPos.x,
    y: labelPos.y,
    fontSize,
    text: value,
    textAlign: 'center' as TextAlignType,
    fill,
    textBaseline: labelPos.textBaseline,
    visible: visible !== false,
    ...otherAttrs,
  };
  return {
    name: 'label',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs),
  };
};

const parseIcon = (style: NodeStyle) => {
  const { icon } = style;

  const {
    value = '',
    type,
    fontFamily,
    // @ts-ignore
    textAlign = 'center',
    // @ts-ignore
    textBaseline = 'middle',
    fill,
    size,
    visible,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clip, // clip字段是保留的，放入attrs中会引起报错
    ...otherAttrs
  } = icon;

  const [width, height] = convertSizeToWH(size);

  const params = {
    name: 'icon',
    visible: visible !== false,
    capture: false,
  };

  if (type === 'text' || type === 'font') {
    return {
      ...params,
      attrs: {
        x: 0,
        y: 0,
        textAlign,
        textBaseline,
        text: value,
        fontSize: width,
        fontFamily,
        fill,
        visible: visible !== false,
        ...otherAttrs,
      },
    };
  }
  // image
  return {
    ...params,
    attrs: {
      x: -width / 2,
      y: -height / 2,
      img: value,
      width,
      height,
      visible: visible !== false,
      ...otherAttrs,
    },
  };
};

/** 根据用户输入的json，解析成attr */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAttr = (style: NodeStyle, itemShapeName: string) => {
  if (itemShapeName === 'keyshape') {
    return parseKeyshape(style).attrs;
  }
  if (itemShapeName === 'halo') {
    return parseHalo(style).attrs;
  }
  if (itemShapeName === 'label') {
    return parseLabel(style).attrs;
  }
  if (itemShapeName === 'icon') {
    return parseIcon(style).attrs;
  }

  return style[itemShapeName] || {};
};

const drawBadge = (badge: any, group: IGroup, r: number) => {
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
    id
  } = badge;

  const offset = convertSizeToWH(inputOffset);
  const [width, height] = convertSizeToWH(badgeSize);
  const { x: badgeX, y: badgeY } = getBadgePosition(position, r);

  let realX = badgeX;
  let realY = badgeY;

  // 绘制 badge 的外层容器，根据宽度和高度确定是 circle 还是 rect

  if (width === height) {
    realX += offset[0];
    realY += offset[1];
    const shape: ShapeCfg = {
      attrs: {
        r: width / 2 + padding,
        fill,
        stroke,
        x: realX,
        y: realY,
      },
      name: 'badges-circle',
    };
    if (id) {
      shape.id = id;
    }

    group.addShape('circle', shape);
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
    const shape: ShapeCfg = {
      attrs: {
        width: width + padding * 2,
        height: height + padding * 2,
        fill,
        stroke,
        x: realX,
        y: realY,
        radius: (height + padding * 2) / 3,
      },
      name: 'badges-rect',
    };
    if (id) {
      shape.id = id;
    }
    group.addShape('rect', shape);
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
      name: 'badges-text',
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
      name: 'badges-image',
    });
  }
};
export default () => {
  G6.registerNode('graphin-circle', {
    options: {
      style: {},
      status: {},
    },
    draw(cfg: IUserNode, group: IGroup) {
      // @ts-ignore
      const { _theme } = cfg.style;

      this.options = getStyleByTheme(_theme);

      const style = deepMix({}, this.options.style, cfg.style) as NodeStyle; // getStyles({}, this.options.style, cfg.style) as NodeStyle;
      /** 将初始化样式存储在model中 */
      cfg._initialStyle = { ...style };
      const { icon, badges = [], keyshape: keyShapeStyle } = style;

      const r = getRadiusBySize(keyShapeStyle.size) as number;

      // halo 光晕
      group.addShape('circle', parseHalo(style));

      // keyshape 主容器
      const keyShape = group.addShape('circle', parseKeyshape(style));

      // 文本

      group.addShape('text', parseLabel(style));

      // keyShape 中间的 icon

      const { type } = icon;
      if (type === 'text' || type === 'font') {
        group.addShape('text', parseIcon(style));
      }
      if (type === 'image') {
        const imageAttrs = parseIcon(style);
        const imageShape = group.addShape('image', imageAttrs);
        const { clip } = style.icon;
        if (clip) {
          const { r, ...clipStyle } = clip;
          imageShape.setClip({
            type: 'circle',
            attrs: {
              x: 0,
              y: 0,
              r,
              ...clipStyle,
            },
          });
        }
      }

      // badges 会存在多个的情况
      badges.forEach(badge => {
        drawBadge(badge, group, r);
      });

      return keyShape;
    },
    setState(name: string, value: string, item: INode) {
      if (!name) return;
      const model = item.getModel() as any;
      const shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定

      const initStateStyle = deepMix({}, this.options.status, model.style.status);
      const initialStyle = item.getModel()._initialStyle as any;
      const status = item._cfg?.states || [];

      try {
        Object.keys(initStateStyle).forEach(statusKey => {
          if (name === statusKey) {
            if (value) {
              setStatusStyle(shapes, initStateStyle[statusKey], parseAttr); // 匹配到status就改变
            } else {
              setStatusStyle(shapes, initialStyle, parseAttr); // 没匹配到就重置
              status.forEach(key => {
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

    update(cfg: IUserNode, item: INode) {
      if (!cfg.style) return;
      try {
        const style = deepMix({}, cfg._initialStyle, cfg.style) as NodeStyle; // getStyles(cfg._initialStyle, cfg.style) as NodeStyle;
        cfg._initialStyle = { ...style };
        const { badges, keyshape } = style;
        const r = getRadiusBySize(keyshape.size) as number;
        const group = item.getContainer();
        const shapes = group.get('children');
        setStatusStyle(shapes, style, parseAttr);

        const copyShapes = [...shapes];
        if (badges && badges.length > 0) {
          let index = 0;
          copyShapes.forEach(shape => {
            if (shape.cfg.name.startsWith('badges')) {
              shapes.splice(index, 1);
            } else {
              index = index + 1;
            }
          });
          badges.forEach(badge => {
            drawBadge(badge, group, r);
          });
        }
      } catch (error) {
        console.error('error');
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
