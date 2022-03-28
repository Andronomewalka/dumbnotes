import React, { FC, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Splitter } from 'components/Splitter';
import { NavTreeNode } from './NavTreeNode';
import { NavStub } from './NavStub';
import { NavNodeType } from './types';
import { Wrapper, NavWrapper, NavUlExternal } from './styles';
import {
  iterateNavNode,
  getNavNodesFromBase,
  getNavNodeById,
  setSelectedNavNode,
} from './utils';

const minNavWidth = 250;
// const navItemsBase = getNavNodes(navMock);

export const Nav: FC = () => {
  const router = useRouter();
  const { data: response } = useSWR(`/api/navigation`);
  const [navItems, setNavItems] = useState<NavNodeType[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // get base navigation when it's changed from swr response
  const navItemsBase = useMemo(() => {
    if (response?.data) {
      try {
        const navItemsRaw = response.data;
        return getNavNodesFromBase(navItemsRaw);
      } catch (e: any) {
        console.log(e);
      }
    }
    return [];
  }, [response]);

  // ui change selected
  const onNavClick = useCallback(
    (selectedNode: NavNodeType) => {
      const newNavItems = [...navItemsBase];
      const isSelectedNodeHasSubNodes =
        selectedNode.subItems && selectedNode.subItems.length > 0;
      let changesOccured = false;

      newNavItems.forEach((node) => {
        iterateNavNode(node, (node) => {
          if (isSelectedNodeHasSubNodes && node.id === selectedNode.id) {
            node.isOpen = !node.isOpen;
            changesOccured = true;
          } else if (!isSelectedNodeHasSubNodes) {
            if (node.isSelected && node.id !== selectedNode.id) {
              node.isSelected = false;
              changesOccured = true;
            } else if (!node.isSelected && node.id === selectedNode.id) {
              setSelectedNavNode(node);
              changesOccured = true;
            }
          }
        });
      });

      if (changesOccured) {
        setNavItems(newNavItems);
      }
    },
    [navItemsBase]
  );

  // define selected on route
  useEffect(() => {
    const path = router.asPath.substring(router.asPath.indexOf('/') + 1);
    if (navItemsBase.length > 0 && path) {
      const selectedNode = getNavNodeById(navItemsBase, path);
      if (selectedNode) {
        onNavClick(selectedNode);
      }
    }
  }, [navItemsBase, onNavClick, router.asPath]);

  // set onClick to nodes
  useEffect(() => {
    navItemsBase.forEach((node) => {
      iterateNavNode(node, (node) => {
        node.onClick = onNavClick;
      });
    });
    const newNavItems = [...navItemsBase];
    setNavItems(newNavItems);
  }, [navItemsBase, onNavClick]);

  return (
    <Wrapper minWidth={`${minNavWidth}px`} ref={wrapperRef}>
      <NavWrapper>
        {!navItems || !navItems.length ? (
          <NavStub />
        ) : (
          <NavUlExternal isOpen={true}>
            {navItems.map((item) => (
              <NavTreeNode key={item.id} {...item} level={item.level} />
            ))}
          </NavUlExternal>
        )}
      </NavWrapper>
      <Splitter containerRef={wrapperRef} minContainerWidth={minNavWidth} />
    </Wrapper>
  );
};
