import styled, { css } from 'styled-components';

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

const NavUlBase = css`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
`;

export const NavUl = styled.ul`
  ${NavUlBase};
  height: 0;
  transition: height ease 0.3s;
`;

export const NavUlExternal = styled.ul`
  ${NavUlBase};
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const NavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  padding: 10px 2px 10px 10px;
  overflow-y: auto;

  > ${NavUlExternal}:hover {
    ${NavIndent} {
      opacity: 1;
    }
  }
`;

export const NavLi = styled.li<{ bottom: boolean }>`
  margin-top: ${(props) => (props.bottom ? 'auto' : 0)};
  color: ${(props) => props.theme.palette.foreground};
`;

const BaseNavItem = css`
  min-height: 30px;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const NavItemExpandable = styled.div<{ level: number }>`
  ${BaseNavItem}
  padding-left: ${(props) => `${props.level * 10}px`};
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.palette.backgroundHover};
  }
`;

export const NavItemLink = styled.a<{ isSelected: boolean; level: number }>`
  ${BaseNavItem}
  display: block;
  padding-left: ${(props) => `${props.level * 10}px`};
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.palette.backgroundHover : 'transparent'};

  :hover {
    background: ${(props) => props.theme.palette.backgroundHover};
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

export const NavStubItem = styled.div<{ number: number }>`
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
