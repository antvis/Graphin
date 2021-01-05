import Force from '../force';
import Graphin from '../../Graphin';

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
          name: 'random',
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
    init(data: any) {
      const self = this;
      self.nodes = data.nodes;
      self.edges = data.edges;
      console.log(this, this.getDefaultCfg());
      const { width, height, graph, ...layoutConfig } = this;
      const { animation, done = () => {}, ...others } = this.getDefaultCfg();

      /** 1. Create a force simulator */
      self.simulation = new Force({
        width,
        height,
        animation,
        done: () => {
          done(graph);
        },
        ...others,
        ...layoutConfig,
      });

      // 2. Mount Data
      self.simulation.setData(data);

      let resultData = data;

      // 3. Custom rendering function
      self.simulation.register('render', (forceData: any) => {
        if (!animation) {
          // 如果不需要动画
          resultData = forceData;
          return;
        }
        try {
          forceData.nodes.forEach((item: any) => {
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
      const self = this;
      // TODO
      /**  4. Start force  simulator */
      self.simulation.start();
    },
    /**
     * 根据传入的数据进行布局
     * @param {Object} data 数据
     */
    layout(data: any) {
      const self = this;
      self.init(data);
      self.execute();
    },
    /**
     * 更新布局配置，但不执行布局
     * @param {Object} cfg 需要更新的配置项
     */
    updateCfg(cfg: any) {
      const self = this;
      self.cfg = {
        ...self.cfg,
        ...cfg,
      };
    },
    /**
     * 销毁
     */
    destroy() {
      const self = this;
      self.destroyed = true;
      self.simulation.stop();
      self.simulation = null;
    },
  });
};
