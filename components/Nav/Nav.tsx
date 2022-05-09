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
  getNavNodeByPath,
  setSelectedNavNode,
  closeUlNode,
  openUlNode,
} from './utils';

const minNavWidth = 250;
// const navItemsBase = getNavNodes(navMock);

export const Nav: FC = () => {
  const router = useRouter();
  const { data: response } = useSWR(`/navigation`);
  const [navItems, setNavItems] = useState<NavNodeType[]>([]);
  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const isFirstNavigation = useRef(true);

  // get base navigation when it's changed from swr response
  const navItemsBase = useMemo(() => {
    if (response?.data) {
      try {
        const navItemsRaw = response.data;
        return getNavNodesFromBase(navItemsRaw);
      } catch (error: any) {
        console.log(error);
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
            if (node.isOpen) {
              closeUlNode(node);
            } else {
              openUlNode(node);
            }
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
    if (navItemsBase.length > 0) {
      const route = router.asPath.includes('#')
        ? router.asPath.slice(0, router.asPath.indexOf('#'))
        : router.asPath;
      const selectedNode = getNavNodeByPath(navItemsBase, route);
      if (selectedNode) {
        if (isFirstNavigation.current) {
          // wait for dom to fully load before first navigation
          new Promise((resolve) => {
            (function waitForAElement() {
              const aElement = document.querySelector(`a[href$="${selectedNode.path}"]`);
              if (aElement) {
                return resolve(aElement);
              }
              setTimeout(waitForAElement, 50);
            })();
          }).then(() => {
            isFirstNavigation.current = false;
            onNavClick(selectedNode);
          });
        } else {
          onNavClick(selectedNode);
        }
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
    <NavWrapper>
      <NavUlExternal minWidth={`${minNavWidth}px`} ref={wrapperRef}>
        {!navItems || !navItems.length ? (
          <NavStub />
        ) : (
          navItems.map((item) => (
            <NavTreeNode key={item.id} {...item} level={item.level} />
          ))
        )}
      </NavUlExternal>
      <Splitter containerRef={wrapperRef} minContainerWidth={minNavWidth} />
    </NavWrapper>
  );
};
