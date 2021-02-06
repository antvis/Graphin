import { GraphinTreeData } from '../typings/type';

// export interface Node {
//   id: string;
//   parent?: Node;
//   data?: any; // eslint-disable-line
//   children: Node[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }

export interface Node extends GraphinTreeData {
  parent?: Node;
}

export default class Tree {
  private root: Node | undefined;

  private nodeIds: string[] = [];

  constructor(root?: Node) {
    // Pass in the root of an existing tree
    if (root) this.root = root;
  }

  bfs = (cb: (node: Node) => boolean): Node | undefined => {
    if (!this.root) {
      return;
    }

    const queue: Node[] = [];

    queue.push(this.root);
    while (queue.length) {
      const node = queue.shift() as Node;
      if (cb(node)) {
        return node;
      }
      if (node?.children?.length) {
        queue.push(...node.children);
      }
    }
  };

  getRoot = (): Node | undefined => {
    return this.root;
  };

  getNode = (id: string): Node | undefined => {
    const result = this.bfs(node => {
      return node.id === id;
    });

    return result;
  };

  // eslint-disable-next-line
  private addRoot = (id: string, data?: any) => {
    this.root = {
      id,
      children: [],
    };
    this.nodeIds.push(id);
  };

  // eslint-disable-next-line
  addNode = (conf: { parentId?: string; id: string; data?: any }) => {
    const { parentId, id, data } = conf;
    if (!this.root) {
      this.addRoot(id, data);
      return;
    }

    let parent: Node | undefined;

    if (!parentId) {
      // If parentId was not given, pick a random node as parent
      const index = Math.floor(Math.random() * this.nodeIds.length);
      parent = this.getNode(this.nodeIds[index]);
    } else {
      parent = this.getNode(parentId);
    }

    if (!parent) {
      console.error(`Parent node doesn't exist!`);
      return;
    }

    this.nodeIds.push(id);
    // @ts-ignore
    (parent as Node).children.push({
      id,
      // @ts-ignore
      parent,
      children: [],
    });
  };
}
