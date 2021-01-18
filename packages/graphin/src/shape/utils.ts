/**
 *
 * @param shapes 元素组合的shape集合
 * @param statusStyle 该节点的样式：可以是状态激活样式，也可以是默认样式
 * @param parseAttr 将用户传递的JSON解析为G理解的Attr
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStatusStyle = (shapes: any, statusStyle: any, parseAttr: (style: any, shapeName: string) => any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try {
    shapes.forEach((shapeItem: any) => {
      const itemShapeName = shapeItem.cfg.name;
      const style = statusStyle[itemShapeName];
      if (style) {
        const { animate, visible, ...otherAttrs } = parseAttr(style, itemShapeName);
        shapeItem.attr(otherAttrs);
        shapeItem.cfg.visible = visible !== false;
        if (animate) {
          const { attrs, ...animateOptions } = animate;
          shapeItem.animate(attrs, animateOptions);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
