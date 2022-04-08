import G6 from '@antv/g6';

export default () => {
  G6.registerLayout('preset', {
    init() {},
    execute() {},
    destroy() {
      this.destroyed = true;
    },
  });
};
