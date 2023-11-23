export default (e, graph) => {
  Object.assign(e, {
    item: {
      getModel: () => {
        const i = graph.getItemById(e.itemId);
        const { visible, model } = i;
        if (visible) {
          return model;
        }
        return {};
      },
    },
  });
  return e;
};
