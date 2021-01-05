import Graphin from '../../Graphin';

export default () => {
  Graphin.registerLayout('render', {
    init() {},
    execute() {},
    destroy() {
      this.destroyed = true;
    },
  });
};
