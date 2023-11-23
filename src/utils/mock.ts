import Tree from './Tree';
import walk from './walk';

import { IUserNode, IUserEdge, GraphinData, GraphinTreeData } from '../typings/type';

const defaultOptions = {
  /** 节点 */
  nodeCount: 10,
  nodeType: 'company',
};

type OptionType = typeof defaultOptions;

/**
 * 1,mock data with edges,nodes
 * 2.mock nodes properties
 * 3.filter edges
 * 4.
 */
export class Mock {
  nodes: IUserNode[];

  edges: IUserEdge[];

  options: OptionType;

  nodeIds: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  combosData: any;

  // eslint-disable-line  @typescript-eslint/no-explicit-any
  treeData: Tree;

  constructor(count: number) {
    this.options = defaultOptions;
    this.options.nodeCount = count;
    this.nodes = [];
    this.edges = [];
    this.nodeIds = [];
    this.treeData = new Tree();
    this.initNodes();
  }

  initNodes = () => {
    const { nodeCount, nodeType } = this.options;
    const temp = Array.from({ length: nodeCount });
    this.nodes = temp.map((node, index) => {
      return {
        id: `node-${index}`,
        label: `node-${index}`,
        type: nodeType,
      };
    });

    for (let i = 0; i < nodeCount; i = i + 1) {
      for (let j = 0; j < nodeCount - 1; j = j + 1) {
        this.edges.push({
          source: `node-${i}`,
          target: `node-${j}`,
        });
      }
    }
    this.nodeIds = this.nodes.map(node => node.id);
  };

  expand = (snodes: IUserNode[]) => {
    this.edges = [];
    this.nodes = [];
    snodes.forEach(node => {
      for (let i = 0; i < this.options.nodeCount; i += 1) {
        this.nodes.push({
          id: `${node.id}-${i}`,
          type: node.type,
        });
        this.edges.push({
          source: `${node.id}-${i}`,
          target: node.id,
        });
      }
    });
    return this;
  };

  type = (nodeType: string) => {
    this.nodes = this.nodes.map(node => {
      return {
        ...node,
        type: nodeType,
      };
    });
    return this;
  };

  circle = (centerId = '') => {
    let id = centerId;
    if (this.nodeIds.indexOf(id) === -1) {
      id = 'node-0';
    }
    this.edges = this.edges.filter((edge: IUserEdge) => {
      return edge.source === id || edge.target === id;
    });
    return this;
  };

  /**
   * @param ratio 随机的稀疏程度，默认0.5
   */
  random = (ratio = 0.5) => {
    const { nodeCount } = this.options;
    const length: number = parseInt(String(nodeCount * ratio));
    /**  随机ID */
    const randomArray: string[] = this.nodeIds.sort(() => Math.random() - 0.5).slice(0, length);

    this.edges = this.edges.filter((edge: IUserEdge) => {
      return randomArray.indexOf(edge.target) !== -1;
    });

    this.edges = this.edges.sort(() => Math.random() - 0.5).slice(0, length);

    return this;
  };

  tree = () => {
    this.edges = [];
    this.treeData = new Tree();
    const rootId = this.nodeIds[0];

    this.nodeIds.forEach(id => {
      this.treeData.addNode({
        id,
        // @ts-ignore
        style: {
          label: {
            value: id,
          },
        },
      });
    });

    this.treeData.bfs(node => {
      if (node.id !== rootId) {
        this.edges.push({
          source: node?.parent?.id as string,
          target: node.id,
          properties: [],
        });
      }
      return false;
    });

    return this;
  };

  value = () => {
    return {
      nodes: this.nodes,
      edges: this.edges,
    };
  };

  combos = (chunkSize: number) => {
    const comboIds = new Set();
    this.nodes = this.nodes.map((node, index) => {
      const comboIndex = Math.ceil((index + 1) / chunkSize);
      const comboId = `combo-${comboIndex}`;
      comboIds.add(comboId);
      return {
        ...node,
        comboId,
      };
    });
    this.combosData = [...comboIds].map(c => {
      return {
        id: c,
        label: c,
      };
    });

    return this;
  };

  graphin = (): GraphinData => {
    return {
      // @ts-ignore
      nodes: this.nodes.map(node => {
        return {
          ...node,
          id: node.id,
          type: 'graphin-circle',
          comboId: node.comboId,
          style: {
            label: {
              value: `${node.id}`,
            },
          },
        };
      }),
      edges: this.edges.map(edge => {
        return {
          source: edge.source,
          target: edge.target,
        };
      }),
      combos: this.combosData,
    };
  };

  graphinTree = (): GraphinTreeData => {
    const tree = this.treeData.getRoot();
    // @ts-ignore
    walk(tree, node => {
      // @ts-ignore
      delete node.parent;
    });
    // @ts-ignore
    return tree as GraphinTreeData;
  };
}

const mock = (count: number) => {
  return new Mock(count);
};
export default mock;
