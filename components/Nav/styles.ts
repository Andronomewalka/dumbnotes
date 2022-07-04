import styled, { css } from 'styled-components';
import { device } from 'utils/media';

const NavUlBase = css`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavSplitterArea = styled.div<{ minWidth: string }>`
  width: ${(props) => props.minWidth};
  min-width: ${(props) => props.minWidth};
  padding: 20px 6px 20px 20px;
  overflow-y: auto;

  transition: 0.4s 0.2s opacity linear, 0.3s width linear, 0.3s min-width linear,
    margin 0.3s linear, padding 0.3s linear;

  &.is-hidden {
    transition: 0.2s opacity linear, 0.3s width linear, 0.3s min-width linear,
      margin 0.3s linear, padding 0.3s linear;
    opacity: 0;
    min-width: 0;
    padding-right: 0;
    padding: 20px 10px;
    white-space: nowrap;
    pointer-events: none;
  }

  /* hide navigation before transitions on first load on tablet */
  @media ${device.tablet} {
    display: none;

    &.is-tablet-loaded {
      display: flex;
    }

    &.is-hidden {
      padding: 0;
    }
  }
`;

export const NavUl = styled.ul`
  ${NavUlBase};
  height: 0;
  overflow-y: hidden;
  transition: height ease 0.3s;
`;

export const NavUlExternal = styled.ul`
  ${NavUlBase};
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: visible;

  /* hide navigation before transitions on first load on tablet */
  @media ${device.tablet} {
    width: 100%;
    padding-right: 80px;
  }
`;

export const NavLi = styled.li<{ level: number; bottom: boolean }>`
  position: relative;
  margin-top: ${(props) => (props.bottom ? 'auto' : 0)};
  color: ${(props) => props.theme.palette.dark};

  ::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 1px;
    top: 0;
    left: ${(props) => `${props.level * 10}px`};
    margin-left: -7px;
    z-index: 1;
    opacity: 0;
    background: ${(props) => props.theme.palette.gray};
    transition: all ease 0.3s;
  }
`;

export const NavWrapper = styled.nav<{isLevelIndicatorVisible: boolean}>`
  display: flex;
  height: 100%;
  opacity: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props) => props.theme.palette.background};

  @media ${device.tablet} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
  }

  ${NavUlExternal}:hover {
    ${NavUl} ${NavLi}::before {
      opacity: ${(props) => props.isLevelIndicatorVisible ? 1 : 0};
    }
  }
`;

const BaseNavItem = css`
  min-height: 30px;
  padding: 5px 10px;
  border-radius: 5px;

  @media ${device.tablet} {
    font-size: 13pt;
    padding: 7px 10px;
  }
`;

export const NavItemExpandable = styled.div<{ level: number }>`
  ${BaseNavItem}
  padding-left: ${(props) => `${props.level * 10}px`};
  cursor: pointer;

  :hover,
  :focus {
    background: ${(props) => props.theme.palette.selected};
  }

  :focus {
    outline: none;
  }

  @media ${device.tablet} {
    padding-left: ${(props) => `${props.level * 10}px`};
  }
`;

export const NavItemLink = styled.a<{ isSelected: boolean; level: number }>`
  ${BaseNavItem}
  position: relative;
  display: block;
  padding-left: ${(props) => `${props.level * 10}px`};
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.palette.selected : 'transparent'};

  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    content: '';
    /* box-shadow: ${(props) =>
      props.isSelected ? props.theme.shadow.focus : 'none'}; */
    opacity: ${(props) => (props.isSelected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  :hover,
  :focus {
    background: ${(props) => props.theme.palette.selected};
  }

  :focus {
    outline: none;
  }

  @media ${device.tablet} {
    padding-left: ${(props) => `${props.level * 10}px`};
  }
`;

export const NavExpandItems = styled.div<{ isOpen: boolean }>`
  display: inline-block;
  margin-right: 6px;

  ::before {
    display: inline-block;
    position: relative;
    top: -1px;
    content: '\\003e';
    transform: rotate(${(props) => (props.isOpen ? '90deg' : '0')}) scaleY(1.5);
    transform-origin: center;
    transition: all ease 0.3s;
  }
`;

export const NavStubItem = styled.li<{ number: number }>`
  ${BaseNavItem}
  margin-bottom: 5px;
  background: linear-gradient(
    90deg,
    rgba(221, 223, 244, 1) 0%,
    rgba(255, 255, 255, 0) 74%
  );
  background-repeat: repeat-y;
  background-size: 85%, 100%;
  background-position: 0 0;
  animation: loading 1.3s ease-out infinite alternate;
  animation-delay: ${(props) => `${props.number}50ms`};

  @keyframes loading {
    to {
      background-position: 150% 0, 0 0;
    }
  }
`;
