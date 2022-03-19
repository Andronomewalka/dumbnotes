import React, { FC, useState } from 'react';
import { NavNodeType } from './types';
import { NavUl, NavLi, NavItem, NavIndent } from './styles';

export const NavTreeNode: FC<NavNodeType> = (prop) => {
  const { name, subItems, isOpen, isSelected, level, onClick } = prop;
  const hasSubItems = (subItems && subItems.length > 0) ?? false;

  const onClickInternal = (e: any) => {
    e.stopPropagation(); // to prevent bubbling, and action for parent ul
    onClick?.(prop);
  };

  return (
    <NavLi onClick={onClickInternal}>
      <NavItem
        level={level}
        isOpen={isOpen}
        isSelected={isSelected}
        hasSubItems={hasSubItems}
      >
        {name}
      </NavItem>
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
    </NavLi>
  );
};
