import { NavNodeType } from './types';

export const iterateNavNode = (
  node: NavNodeType,
  callback: (node: NavNodeType) => void
) => {
  callback(node);
  if (node.subItems && node.subItems.length > 0) {
    node.subItems.forEach((subNode) => {
      iterateNavNode(subNode, callback);
    });
  }
};
