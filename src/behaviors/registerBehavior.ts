import { extend, Graph } from '@antv/g6';

/**
 *
 * @param type 交互名称
 * @param instance 交互实例
 */
const registerBehavior = (name, instance) => {
  extend(Graph, {
    behaviors: {
      [name]: instance,
    },
  });
};
export default registerBehavior;
