import Graphin from '../../Graphin';

export default () => {
  Graphin.registerLayout('preset', {
    init() {},
    execute() {},
    destroy() {
      this.destroyed = true;
    },
  });
};
