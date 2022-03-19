import styled from 'styled-components';
import { NavItemStyleType } from './types';

export const Wrapper = styled.div<{ minWidth: string }>`
  display: flex;
  justify-content: space-between;
  height: 100%;
  min-width: ${(props) => props.minWidth};
  background: ${(props) => props.theme.palette.background};
`;

export const NavIndent = styled.div<{ level: number }>`
  position: absolute;
  height: 100%;
  width: 2px;
  top: 0;
  left: ${(props) => `${props.level * 10}px`};
  margin-left: -7px;
  z-index: 1;
  opacity: 0;
  background: ${(props) => props.theme.palette.whiteSemiTransparent};
  transition: all ease 0.3s;
`;

export const NavUl = styled.ul<{ isOpen: boolean }>`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
  height: ${(props) => (props.isOpen ? 'auto' : '0')};
`;

export const NavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  padding: 10px;

  > ${NavUl}:hover {
    ${NavIndent} {
      opacity: 1;
    }
  }
`;

export const NavLi = styled.li`
  color: ${(props) => props.theme.palette.foreground};
`;

export const NavItem = styled.div<NavItemStyleType>`
  padding: 5px 10px;
  padding-left: ${(props) => `${props.level * 10}px`};
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.palette.backgroundHover : 'transparent'};

  :hover {
    background: ${(props) => props.theme.palette.backgroundHover};
  }

  ::before {
    display: ${(props) => (props.hasSubItems ? 'inline-block' : 'none')};
    content: '\\003e';
    transform: rotate(${(props) => (props.isOpen ? '90deg' : '0')}) scaleY(1.5);
    transform-origin: 40% 50%;
    padding-right: 3px;
    transition: all ease 0.3s;
  }
`;
