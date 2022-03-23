import React, { FC } from 'react';
import { NavNodeType } from './types';
import {
  NavUl,
  NavLi,
  NavIndent,
  NavExpandItems,
  NavItemLink,
  NavItemExpandable,
} from './styles';
import Link from 'next/link';

export const NavTreeNode: FC<NavNodeType> = (prop) => {
  const { name, path, subItems, isOpen, isSelected, level, onClick } = prop;
  const hasSubItems = (subItems && subItems.length > 0) ?? false;

  const onClickInternal = (e: any) => {
    e.stopPropagation(); // to prevent bubbling, and action for parent ul
    onClick?.(prop);
  };

  return (
    <NavLi>
      {hasSubItems ? (
        <>
          <NavItemExpandable level={level} isOpen={isOpen} onClick={onClickInternal}>
            <NavExpandItems isOpen={isOpen} />
            {name}
          </NavItemExpandable>
          {hasSubItems && (
            <NavUl isOpen={isOpen}>
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
        <Link href={`/${path}`} passHref>
          <NavItemLink level={level} isSelected={isSelected}>
            {name}
          </NavItemLink>
        </Link>
      )}
    </NavLi>
  );
};
