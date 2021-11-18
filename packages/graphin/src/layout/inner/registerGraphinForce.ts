import Force from '../force';
import Graphin from '../../Graphin';
import { GraphinData } from '../../typings/type';

export default () => {
  Graphin.registerLayout('graphin-force', {
    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg() {
      return {
        /** 前置布局，默认为 concentric */
        preset: {
          /** 特殊情况处理：前置布局为force，但是前置的数据也为空，则证明是初始化force布局，否则为正常前置force布局 */
          name: 'grid',
          options: {},
        },
        /** spring stiffness 弹簧劲度系数 * */
        stiffness: 200.0,
        /** repulsion 斥力，这里指代 库伦常量Ke */
        repulsion: 200.0 * 5,
        /** 向心力 */
        centripetalOptions: {
          leaf: 1.6,
          single: 1.6,
        },
        /** 速度的减震因子，其实就是阻尼系数 */
        damping: 0.9,
        /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽 */
        minEnergyThreshold: 0.1,
        /** 最大的速度 [0,1000] */
        maxSpeed: 1000,
        /** 最大迭代数 */
        MaxIterations: 10000, // 240, // 1000000次/(1000/60) = 60000s = 1min
        /** 是否开启动画 */
        animation: true,
      };
    },
    /**
     * 初始化
     * @param {Object} data 数据
     */
    init(data: GraphinData) {
      this.nodes = data.nodes;
      this.edges = data.edges;
      const { graph, ...layoutConfig } = this;

      const options = { ...this.getDefaultCfg(), ...layoutConfig };

      const { width, height, animation, done = () => {}, ...others } = options;
      /** 1. Create a force simulator */
      this.simulation = new Force({
        width,
        height,
        animation,
        ...others,
        ...layoutConfig,
        done: nodes => {
          done(graph, nodes);
        },
      });

      // 2. Mount Data
      this.simulation.setData(data);

      // 3. Custom rendering function
      this.simulation.register('render', (forceData: GraphinData) => {
        if (!animation && data && data.nodes && data.nodes.length > 0) {
          // 如果不需要动画
          const { nodes } = forceData;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.nodes.forEach((node, index: number) => {
            const indexNode = nodes[index];

            if (indexNode && indexNode.id === node.id) {
              node.x = nodes[index].x;
              node.y = nodes[index].y;
            } else {
              const matchNode = nodes.find(item => {
                return item.id === node.id;
              });
              if (matchNode) {
                node.x = matchNode.x;
                node.y = matchNode.y;
              }
            }
          });

          return {
            ...forceData,
          };
        }
        try {
          forceData.nodes.forEach(item => {
            const node = graph.findById(item.id);
            if (node) {
              // 因为有可能画布删除了节点
              const model = node.get('model');
              model.x = item.x;
              model.y = item.y;
            }
          });
          graph.refreshPositions();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });
    },
    /**
     * 执行布局
     */
    execute() {
      // TODO
      /**  4. Start force  simulator */
      this.simulation.start();
    },
    /**
     * 根据传入的数据进行布局
     * @param {Object} data 数据
     */
    layout(data: GraphinData) {
      this.init(data);
      this.execute();
    },
    /**
     * 更新布局配置，但不执行布局
     * @param {Object} cfg 需要更新的配置项
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCfg(cfg: any) {
      this.cfg = {
        ...this.cfg,
        ...cfg,
      };
    },
    /**
     * 销毁
     */
    destroy() {
      this.destroyed = true;
      this.simulation.stop();
      this.simulation = null;
    },
  });
};
