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

export const getNavNodeByPath = (
  navItems: NavNodeType[],
  path: string
): NavNodeType | null => {
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
  if (node.parent) {
    drillOpenUlNode(node.parent);
  }
  const selectedA = document.querySelector(`a[href$="${node.path}"]`);
  if (selectedA) {
    selectedA.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
};

export const getElementByNode = (node: NavNodeType) => {
  return document.querySelector(`[data-nav-sub-id="${node.id}"]`) as HTMLElement;
};

const drillOpenUlNode = (node: NavNodeType) => {
  let curNode: NavNodeType | null = node;
  while (curNode) {
    if (curNode.parent && !curNode.parent.isOpen) {
      openUlNode(curNode, true);
    } else {
      openUlNode(curNode, false);
    }
    // if (!curNode.parent) {
    //   openUlNode(curNode, false);
    // }
    curNode = curNode.parent;
  }
};

export const openUlNode = (node: NavNodeType, skipTransition: boolean = false) => {
  const ulElement = getElementByNode(node);
  if (!node.isOpen && ulElement) {
    if (skipTransition) {
      ulElement.style.height = 'auto';
      ulElement.style.overflowY = `inherit`;
    } else {
      ulElement.style.height = `${ulElement.scrollHeight}px`;

      const onTransitioned = () => {
        ulElement.style.height = 'auto';
        ulElement.style.overflowY = `inherit`;
        ulElement.removeEventListener('transitionend', onTransitioned);
      };

      ulElement.addEventListener('transitionend', onTransitioned);
    }
  }
  node.isOpen = true;
};

export const closeUlNode = (node: NavNodeType) => {
  const ulElement = getElementByNode(node);
  if (node.isOpen && ulElement) {
    ulElement.style.height = `${ulElement.scrollHeight}px`;
    new Promise((resolve) => setTimeout(resolve, 10)).then(() => {
      ulElement.style.height = '0';
      ulElement.style.overflowY = `hidden`;
    });
  }
  node.isOpen = false;
};
