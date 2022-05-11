import React, { FC, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useVariants } from 'components/VariantsContext';
import { useRouter } from 'next/router';
import useMediaQuery from 'hooks/useMediaQuery';
import { device } from 'utils/media';
import { staggerVariants } from 'utils/staggerVariants';
import { NavNodeType } from './types';
import { NavUl, NavLi, NavExpandItems, NavItemLink, NavItemExpandable } from './styles';

export const NavTreeNode: FC<NavNodeType> = (prop) => {
  const router = useRouter();
  const { setVariants } = useVariants();
  const isMobile = useMediaQuery(device.mobile);
  const { id, name, path, bottom, subItems, isOpen, isSelected, level, onClick } = prop;
  const hasSubItems = (subItems && subItems.length > 0) ?? false;

  const onClickInternal = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // to prevent bubbling, and action for parent ul
    onClick?.(prop);
  };

  const onNavItemLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (path) {
      // mobile routing from Nav occurs flickering for some reasons,
      // disable variants before navigating
      if (router.asPath !== path) {
        setVariants(isMobile ? {} : staggerVariants);
      }
      router.push(path);
    }
  };

  return (
    <NavLi
      level={level}
      bottom={bottom || false}
      as={motion.li}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
    >
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
