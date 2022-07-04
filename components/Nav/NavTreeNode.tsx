import React, { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { useUpdateVariants } from 'hooks/useUpdateVariants';
import { device } from 'utils/media';
import { noVariants, staggerVariants } from 'utils/staggerVariants';
import { NavNodeType } from './types';
import { NavUl, NavLi, NavExpandItems, NavItemLink, NavItemExpandable } from './styles';

export const NavTreeNode: FC<NavNodeType> = (prop) => {
  const router = useRouter();
  const setVariants = useUpdateVariants();
  const isTablet = useMediaQuery(device.tablet);
  const { id, name, path, bottom, subItems, isOpen, isSelected, level, onClick } = prop;
  const hasSubItems = (subItems && subItems.length > 0) ?? false;

  const onClickInternal = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // to prevent bubbling, and action for parent ul
    onClick?.(prop);
  };

  const onNavItemLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (path) {
      // tablet routing from Nav occurs flickering for some reasons,
      // disable variants before navigating
      if (router.asPath !== path) {
        setVariants(isTablet ? noVariants : staggerVariants);
      }
      router.push(path);
    }
  };

  return (
    <NavLi level={level} bottom={bottom || false}>
      {hasSubItems ? (
        <>
          <NavItemExpandable level={level} onClick={onClickInternal}>
            <NavExpandItems isOpen={isOpen} />
            {name}
          </NavItemExpandable>
          {hasSubItems && (
            <NavUl data-nav-sub-id={id}>
              {subItems?.map((item) => (
                <NavTreeNode key={item.id} {...item} level={level + 1} />
              ))}
            </NavUl>
          )}
        </>
      ) : (
        <NavItemLink
          href={path}
          onClick={onNavItemLinkClick}
          level={level}
          isSelected={isSelected}
        >
          {name}
        </NavItemLink>
      )}
    </NavLi>
  );
};
