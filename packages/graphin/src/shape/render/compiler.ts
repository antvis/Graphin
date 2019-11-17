import G6 from '@antv/g6';
import { ExendNodeShape } from '../../types';

const reset = (shapes: any, shapeComponents: any) => {
    shapes.forEach((shape: any, index: any) => {
        if (!shapeComponents[index].noReset)
            shape.attr({
                ...shapeComponents[index].attrs,
            });
    });
};

const compiler = (extendNodeShape: ExendNodeShape) => {
    const { name: registerName, render: renderNodeShape } = extendNodeShape;
    if (!renderNodeShape) {
        return;
    }

    /** 设置初始化shapeComponent，按照节点ID进行分类 */
    const initShapeComponentMap: { [key: string]: any } = {};
    const initStateMap: { [key: string]: any } = {};
    const initUpdateMap: { [key: string]: any } = {};
    G6.registerNode(registerName, {
        /** 自定义Shape */
        draw(inputCfg: any, group: any) {
            /** 得到用户返回的shapeComponents，然后拼装 */

            const { shapeComponents, state: RenderState, update } = renderNodeShape(inputCfg);
            /** 每次draw后的shape就是初始化shape，这个在节点update后，用于setstate的reset */
            initShapeComponentMap[inputCfg.data.id] = shapeComponents;
            initStateMap[inputCfg.data.id] = RenderState;
            initUpdateMap[inputCfg.data.id] = update;
            let keyshapeIndex = 0;
            const g6Shapes = shapeComponents.map((component: any, index: number) => {
                if (component.isKeyShape) keyshapeIndex = index;
                return group.addShape(component.shape, {
                    attrs: {
                        ...component.attrs,
                    },
                });
            });
            return g6Shapes[keyshapeIndex];
        },
        /** 设置各种交互状态 */
        setState(name: any, value: any, node: any) {
            const { id } = node.get('model').data;
            const initShapeComponent = initShapeComponentMap[id];
            const initState = initStateMap[id];

            const shapes = node.getContainer().get('children'); // 顺序根据 draw 时确定
            /** 如果为false，则重置到初始状态 */
            if (!value || !name) {
                reset(shapes, initShapeComponent);
                return;
            }

            /** 如果为为selected状态，则不作高亮 */
            // if (node.hasState('selected') && name === 'highlight.light' && value) return;

            Object.keys(initState).forEach(key => {
                /** state的key和behavior里触发的name匹配 */
                if (name === key) {
                    shapes.forEach((g6Shape: any) => {
                        const originAttrs = g6Shape.attr();
                        const customAttrs = initState[key][originAttrs.id];
                        if (customAttrs) {
                            const { animate, ...otherAttrs } = customAttrs;
                            g6Shape.attr(otherAttrs);
                            if (animate) {
                                /** 如果有动画 */
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
