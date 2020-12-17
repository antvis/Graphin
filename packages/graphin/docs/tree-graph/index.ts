import Hierarchy from '@antv/hierarchy';

// your tree data
const root = {
  isRoot: true,
  id: 'Root',
  children: [
    {
      id: 'SubTreeNode1',
      children: [
        {
          id: 'SubTreeNode1.1',
        },
        {
          id: 'SubTreeNode1.2',
        },
      ],
    },
    {
      id: 'SubTreeNode2',
    },
  ],
};

// apply layout
const NODE_SIZE = 16;
const PEM = 5;

const rootNode = Hierarchy.compactBox(root, {
  direction: 'H', // H / V / LR / RL / TB / BT
  getId(d) {
    return d.id;
  },
  getHeight(d) {
    if (d.isRoot) {
      return NODE_SIZE * 2;
    }
    return NODE_SIZE;
  },
  getWidth(d) {
    if (d.isRoot) {
      return 130;
    }
    return 60;
  },
  getHGap(d) {
    if (d.isRoot) {
      return PEM * 2;
    }
    return PEM;
  },
  getVGap(d) {
    if (d.isRoot) {
      return PEM * 2;
    }
    return PEM;
  },
  getSubTreeSep(d) {
    if (!d.children || !d.children.length) {
      return 0;
    }
    return PEM;
  },
});

console.dir(rootNode);
