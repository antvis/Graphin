import G6 from '@antv/g6';
import defaultOptions from './options';

import Tweak from './tweak';
const FORCE_LAYOUTS = ['force', 'graphin-force', 'g6force', 'gForce', 'comboForce'];
class LayoutController {
  [x: string]: any;
  constructor(graphin: any) {
    this.graphin = graphin;
    this.graph = this.graphin.graph;
    this.presetLayout = {};
    this.updateOptions();
    this.init();
  }

  /**
   * 初始化布局
   */
  init() {
    const { options, graphin } = this;
    const { data } = graphin;
    const { type } = options;
    if (!G6.Layout[type]) {
      console.warn(`${type} layout not found, current layout is grid`);
    }
    const LayoutClass = G6.Layout[type] || G6.Layout['grid'];
    this.graph.emit('beforelayout');
    this.processForce();
    this.instance = new LayoutClass(this.options);
    this.instance.init(data);
  }
  /** 启动布局 */
  start() {
    this.instance.execute();
  }
  restart() {}
  /** 重新布局 */
  changeLayout() {
    const { graph, data, isTree } = this.graphin;
    if (!graph || graph.destroyed || !data || !data.nodes || !data.nodes.length || isTree) {
      return false;
    }
    if (FORCE_LAYOUTS.indexOf(this.options.type) !== -1) {
      this.destroy();
    }

    this.updateOptions();

    /** 布局切换 */

    this.init();
    this.start();
  }
  /** 更新布局参数 */
  updateOptions = () => {
    const { width, height, props } = this.graphin;
    const defaultParams = {
      width,
      height,
      center: [width / 2, height / 2],
    };
    this.prevOptions = (this.options && { ...this.options }) || { type: 'random', ...defaultParams };

    // TODO :默认布局的处理，Combo布局的处理
    const { layout = { type: 'grid' } } = props;
    const { type = 'grid' } = layout;
    const defaultCfg = defaultOptions[type] || {};

    this.options = {
      ...defaultParams,
      ...defaultCfg,
      ...layout,
    };
  };
  processForce = () => {
    const { options, graphin } = this;
    const { graph } = graphin;
    const { type } = options;

    if (type === 'graphin-force') {
      this.options.graph = this.graph;
    }

    if (type === 'force' || type === 'g6force' || type === 'gForce') {
      const { onTick } = this.options;
      const tick = () => {
        if (onTick) {
          onTick();
        }

        graph.refreshPositions();
      };

      this.options.tick = tick;
      const { onLayoutEnd } = this.options;
      this.options.onLayoutEnd = () => {
        if (onLayoutEnd) {
          onLayoutEnd();
        }
        graph.emit('afterlayout');
      };
    }
    if (this.type === 'comboForce') {
      this.options.comboTrees = graph.get('comboTrees');
    }

    const isForceLayout = {
      prev: FORCE_LAYOUTS.indexOf(this.prevOptions.type) !== -1,
      current: FORCE_LAYOUTS.indexOf(this.options.type) !== -1,
    };
    const isSameLayoutType = this.options.type === this.prevOptions.type;

    if (isForceLayout.current && !isSameLayoutType) {
      /**
       * 当前布局为force，且两次布局类型不一致
       * 应当设置当前布局的preset为前一个布局
       *
       */

      const preset = (this.options.layout && this.options.layout.preset) || this.prevOptions;

      this.presetLayout = new G6.Layout[preset.type](preset || {});
      this.presetLayout.init(graphin.data);
      this.presetLayout.execute();
    }

    if (isForceLayout.current && isForceLayout.prev) {
      /**
       * 当前布局类型为force， 前一次布局也为force
       * 渐进布局
       */
      graphin.data = Tweak(graphin.data, this.graph.save());
    }

    /** 布局切换 */
  };
  refreshPosition = () => {
    let { animate } = this.graphin.options;

    if (animate) {
      this.graph.positionsAnimate();
    } else {
      this.graph.refreshPositions();
    }
  };
  destroy = () => {
    this.presetLayout && this.presetLayout.destroy && this.presetLayout.destroy();
    this.instance && this.instance.destroy && this.instance.destroy();
    this.presetLayout = null;
    this.instace = null;
  };

  /** restart */
}

export default LayoutController;
