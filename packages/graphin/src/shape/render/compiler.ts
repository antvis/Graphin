import G6, { Node } from '@antv/g6';
import { G } from '@antv/g6/types/g';
import { ExtendNodeShape, ShapeComponent } from '../../types';

const reset = (shapes: G.Shape[], shapeComponents: ShapeComponent[]) => {
  shapes.forEach((shape, index: number) => {
    if (!shapeComponents[index].noReset)
      shape.attr({
        ...shapeComponents[index].attrs,
      });
  });
};

const compiler = (extendNodeShape: ExtendNodeShape) => {
  const { name: registerName, render: renderNodeShape } = extendNodeShape;
  if (!renderNodeShape) {
    return;
  }

  /** 设置初始化shapeComponent，按照节点ID进行分类 */
  const initShapeComponentMap: { [key: string]: ShapeComponent[] } = {};
  const initStateMap: { [key: string]: any } = {}; // eslint-disable-line
  G6.registerNode(registerName, {
    // 自定义Shape
    // eslint-disable-next-line
    draw(inputCfg: any, group: G.Group) {
      /** 得到用户返回的shapeComponents，然后拼装 */

      const { shapeComponents, state: RenderState } = renderNodeShape(inputCfg);
      /** 每次draw后的shape就是初始化shape，这个在节点update后，用于setstate的reset */
      initShapeComponentMap[inputCfg.data.id] = shapeComponents;
      initStateMap[inputCfg.data.id] = RenderState;

      let keyshapeIndex = 0;
      const g6Shapes = shapeComponents.map((component, index: number) => {
        if (component.isKeyShape) keyshapeIndex = index;
        return group.addShape(component.shape, {
          attrs: {
            ...component.attrs,
          },
        });
      });
      return g6Shapes[keyshapeIndex];
    },

    // 设置各种交互状态
    setState(name: string, value: string, node: Node) {
      const { id } = node.get('model').data;
      const initShapeComponent = initShapeComponentMap[id];
      const initState = initStateMap[id];

      const shapes = node.getContainer().get('children'); // 顺序根据 draw 时确定
      // 如果为false，则重置到初始状态
      if (!value || !name) {
        reset(shapes, initShapeComponent);
        return;
      }

      // 如果为为selected状态，则不作高亮
      // if (node.hasState('selected') && name === 'highlight.light' && value) return;

      Object.keys(initState).forEach(key => {
        // state 的 key 和 behavior 里触发的 name 匹配
        if (name === key) {
          shapes.forEach((g6Shape: G.Shape) => {
            const originAttrs = g6Shape.attr();
            const customAttrs = initState[key][originAttrs.id];
            if (customAttrs) {
              const { animate, ...otherAttrs } = customAttrs;
              g6Shape.attr(otherAttrs);
              if (animate) {
                const { attrs, duration, easing, callback, delay } = animate;
                g6Shape.animate(attrs, duration, easing, callback, delay);
              }
            }
          });
        }
      });
    },
  });
};
export default compiler;
