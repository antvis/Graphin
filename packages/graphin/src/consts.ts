export const TREE_LAYOUTS = ['dendrogram', 'compactBox', 'mindmap', 'indented'];

export const G6_DEFAULT_NODE = {
  type: 'circle',
  size: [30, 30],
  fill: '#9EC9FF',
  stroke: '#5B8FF9',
  lineWidth: 3,
  labelCfg: {
    position: 'bottom',
  },
  icon: {
    show: true,
  },
};

export const G6_DEFAULT_EDGE = {
  type: 'arc',

  labelCfg: {
    autoRotate: true,
    refY: -10,
  },
};

export const G6_DEFAULT_COMBO = {
  defaultCombo: {
    type: 'circle',
    /* style for the keyShape */
    // style: {
    //   lineWidth: 1,
    // },
    labelCfg: {
      /* label's offset to the keyShape */
      // refY: 10,
      /* label's position, options: center, top, bottom, left, right */
      position: 'top',
      /* label's style */
      // style: {
      //   fontSize: 18,
      // },
    },
  },
};

// TODO
export const GRAPHIN_DEFAULT_NODE = {};
