import { NavNodeBaseType, NavNodeType } from './types';

// return true in callback to break iteration
export const iterateNavNode = (
  node: NavNodeType,
  callback: (node: NavNodeType) => boolean | void
) => {
  const breakCurrentIteration = callback(node);
  if (breakCurrentIteration) {
    return true;
  }

  if (node.subItems && node.subItems.length > 0) {
    for (let i = 0; i < node.subItems.length; i++) {
      const subNode = node.subItems[i];
      const breakIteration = iterateNavNode(subNode, callback);
      if (breakIteration) {
        return true;
      }
    }
  }
};

const setNavNodesParents = (navItems: NavNodeType[]) => {
  const setParent = (node: NavNodeType, parent: NavNodeType | null) => {
    node.parent = parent;

    if (node.subItems && node.subItems.length > 0) {
      for (let i = 0; i < node.subItems.length; i++) {
        const subNode = node.subItems[i];
        setParent(subNode, node);
      }
    }
  };

  navItems.forEach((item) => {
    setParent(item, null);
  });
};

export const getNavNodesFromBase = (navItems: NavNodeBaseType[]): NavNodeType[] => {
  const res: NavNodeType[] = JSON.parse(JSON.stringify(navItems));

  res.forEach((item: NavNodeType) => {
    iterateNavNode(item, (item) => {
      item.isOpen = false;
      item.isSelected = false;
      item.level = 1;
    });
  });

  setNavNodesParents(res);
  return res;
};

export const getNavNodeById = (navItems: NavNodeType[], path: string) => {
  let resultNode = null;
  for (let i = 0; i < navItems.length; i++) {
    const node = navItems[i];
    iterateNavNode(node, (item) => {
      if (item.path === path) {
        resultNode = item;
        return true;
      }
    });
    if (resultNode) {
      break;
    }
  }
  return resultNode;
};

export const setSelectedNavNode = (node: NavNodeType) => {
  node.isSelected = true;

  let parent = node.parent;
  while (parent) {
    parent.isOpen = true;
    parent = parent.parent;
  }

  // wait when a appeared after render
  new Promise((resolve) => {
    (function waitForAElement() {
      const aElement = document.querySelector(`a[href$="${node.path}"]`);
      if (aElement) {
        return resolve(aElement);
      }
      setTimeout(waitForAElement, 50);
    })();
  }).then((selectedA: any) => {
    selectedA.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
};
