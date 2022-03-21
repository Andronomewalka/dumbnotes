import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Splitter } from 'components/Splitter';
import { NavTreeNode } from './NavTreeNode';
import { NavNodeType } from './types';
import { Wrapper, NavWrapper, NavUl } from './styles';
import { iterateNavNode } from './utils';
import { navMock, getNavNodes } from './mock';
import { useNavContext } from './context';

const minNavWidth = 250;
const navItemsBase = getNavNodes(navMock);

export const Nav: FC = () => {
  const router = useRouter();
  // const { navItems: navItemsContext } = useNavContext();
  const [navItems, setNavItems] = useState<NavNodeType[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // const navItemsBase = useMemo(() => {
  //   return getNavNodes(navItemsContext);
  // }, [navItemsContext]);

  const onNavClick = (selectedNode: NavNodeType) => {
    const newNavItems = [...navItemsBase];
    const isSelectedNodeHasSubNodes =
      selectedNode.subItems && selectedNode.subItems.length > 0;
    let changesOccured = false;
    let navigationNeeded = false;

    newNavItems.forEach((node) => {
      iterateNavNode(node, (node) => {
        if (isSelectedNodeHasSubNodes && node.id === selectedNode.id) {
          node.isOpen = !node.isOpen;
          changesOccured = true;
        } else if (!isSelectedNodeHasSubNodes) {
          if (node.isSelected && node.id !== selectedNode.id) {
            node.isSelected = false;
            changesOccured = true;
            navigationNeeded = true;
          } else if (!node.isSelected && node.id === selectedNode.id) {
            node.isSelected = true;
            changesOccured = true;
            navigationNeeded = true;
          }
        }
      });
    });

    if (changesOccured) {
      if (navigationNeeded) {
        router.push(`http://localhost:3000/${selectedNode.path}`);
      }
      setNavItems(newNavItems);
    }
  };

  useEffect(() => {
    if (navItems.length === 0) {
      navItemsBase.forEach((node) => {
        iterateNavNode(node, (node) => {
          node.onClick = onNavClick;
        });
      });
      const newNavItems = [...navItemsBase];
      setNavItems(newNavItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  return (
    <Wrapper minWidth={`${minNavWidth}px`} ref={wrapperRef}>
      <NavWrapper>
        <NavUl isOpen={true}>
          {navItems.map((item) => (
            <NavTreeNode key={item.id} {...item} level={item.level} />
          ))}
        </NavUl>
      </NavWrapper>
      <Splitter containerRef={wrapperRef} minContainerWidth={minNavWidth} />
    </Wrapper>
  );
};
