import { GraphinTreeData } from '../typings/type';

const walk = (node: GraphinTreeData, callback: (node: GraphinTreeData) => void) => {
  callback(node);
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      walk(child, callback);
    });
  }
};

export default walk;
