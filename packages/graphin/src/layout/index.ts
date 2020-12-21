import G6 from '@antv/g6';
import deepEqual from '../utils/deepEqual';
import { TREE_LAYOUTS } from '../consts';
import defaultOptions from './options';

class LayoutController {
  [x: string]: any;
  constructor(graphin: any) {
    const { layout } = graphin.props;
    this.graphin = graphin;
    this.updateOptions();

    this.init();
  }

  /**
   * 初始化布局
   */
  init() {
    const { options, graphin } = this;
    const { data } = graphin;
    const { type, ...layoutConfig } = options;
    if (!G6.Layout[type]) {
      console.warn(`${type} layout not found, current layout is grid`);
    }
    const LayoutClass = G6.Layout[type] || G6.Layout['grid'];
    this.instance = new LayoutClass(layoutConfig);
    this.instance.init(data);
  }
  /** 启动布局 */
  start() {
    this.instance.execute();
  }
  restart() {}
  /** 重新布局 */
  changeLayout() {
    this.updateOptions();

    const { type, ...otherOptions } = this.options;
    /** 布局类型一致 */
    if (type === this.prevOptions.type) {
      console.info('layout type is same');
      if (deepEqual(otherOptions, this.options)) {
        return;
      } else {
        this.restart();
      }
    }
    /** 布局切换 */
    if (type !== this.prevOptions.type) {
      this.init();
      this.start();
    }
  }
  /** 更新布局参数 */
  updateOptions = () => {
    this.prevOptions = (this.options && { ...this.options }) || { type: 'random' };

    const { width, height, props } = this.graphin;
    // TODO :默认布局的处理，Combo布局的处理
    const { layout = { type: 'grid' } } = props;
    const { type = 'grid' } = layout;
    const defaultCfg = defaultOptions[type] || {};

    this.options = {
      width,
      height,
      center: [width / 2, height / 2],
      ...defaultCfg,
      ...layout,
    };
  };

  /** restart */
}

export default LayoutController;
