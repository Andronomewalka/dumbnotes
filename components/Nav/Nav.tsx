import React, { FC, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';
import { settingsLevelIndicatorState } from 'state';
import { Splitter } from 'components/Splitter';
import { NavTreeNode } from './NavTreeNode';
import { NavStub } from './NavStub';
import { NavNodeType } from './types';
import { NavWrapper, NavUlExternal, NavSplitterArea } from './styles';
import {
  iterateNavNode,
  getNavNodesFromBase,
  getNavNodeByPath,
  setSelectedNavNode,
  closeUlNode,
  openUlNode,
  navStubVariants,
  navItemsVariants,
} from './utils';
import { useHydrated } from 'hooks/useHydrated';

const minNavWidth = 250;
// const navItemsBase = getNavNodes(navMock);

export const Nav: FC = () => {
  const router = useRouter();
  const { data: response } = useSWR(`/navigation`);
  const [navItems, setNavItems] = useState<NavNodeType[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isFirstNavigation = useRef(true);

  const isLevelIndicatorVisibleRaw = useRecoilValue(settingsLevelIndicatorState);
  const isLevelIndicatorVisible = useHydrated(isLevelIndicatorVisibleRaw);

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
        //in case of popstate clear exist focus
        const focusedElem = document.querySelector<HTMLElement>('li a:focus');
        if (focusedElem) {
          focusedElem.blur();
        }
        if (isFirstNavigation.current) {
          // wait for dom to fully load before first navigation
          new Promise((resolve) => {
            (function waitForAElement() {
              const aElement = document.querySelector(`a[href$="${selectedNode.path}"]`);
              if (aElement) {
                return resolve(aElement);
              }
              setTimeout(waitForAElement, 200);
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

  // for dev usage, manually trigger stub
  const [stub, setStub] = useState(true);

  // for prod
  const isNavLoading = !navItems || !navItems.length;

  return (
    <NavWrapper isLevelIndicatorVisible={isLevelIndicatorVisible ?? false}>
      <NavSplitterArea minWidth={`${minNavWidth}px`} ref={wrapperRef}>
        <AnimatePresence exitBeforeEnter>
          <NavUlExternal
            as={motion.ul}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={isNavLoading ? navStubVariants : navItemsVariants}
            key={`nav-${isNavLoading}`}
          >
            {isNavLoading ? (
              <NavStub />
            ) : (
              navItems.map((item) => (
                <NavTreeNode key={item.id} {...item} level={item.level} />
              ))
            )}
          </NavUlExternal>
        </AnimatePresence>
      </NavSplitterArea>

      <Splitter containerRef={wrapperRef} minContainerWidth={minNavWidth} />
      {process.env.NODE_ENV === 'development' && (
        <button style={{ position: 'fixed', opacity: 0 }} onClick={() => setStub(!stub)}>
          stub
        </button>
      )}
    </NavWrapper>
  );
};
