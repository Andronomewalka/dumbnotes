import React, { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { NavNodeType } from './types';
import {
  NavUl,
  NavLi,
  NavIndent,
  NavExpandItems,
  NavItemLink,
  NavItemExpandable,
} from './styles';

export const NavTreeNode: FC<NavNodeType> = (prop) => {
  const { id, name, path, bottom, subItems, isOpen, isSelected, level, onClick } = prop;
  const hasSubItems = (subItems && subItems.length > 0) ?? false;

  const onClickInternal = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // to prevent bubbling, and action for parent ul
    onClick?.(prop);
  };

  return (
    <NavLi bottom={bottom || false}>
      {hasSubItems ? (
        <>
          <NavItemExpandable level={level} onClick={onClickInternal}>
            <NavExpandItems isOpen={isOpen} />
            {name}
          </NavItemExpandable>
          {hasSubItems && (
            <NavUl data-nav-sub-id={id}>
              <>
                <NavIndent level={level + 1} />
                {subItems?.map((item) => (
                  <NavTreeNode key={item.id} {...item} level={level + 1} />
                ))}
              </>
            </NavUl>
          )}
        </>
      ) : (
        <Link href={path || ''} passHref>
          <NavItemLink level={level} isSelected={isSelected}>
            {name}
          </NavItemLink>
        </Link>
      )}
    </NavLi>
  );
};
