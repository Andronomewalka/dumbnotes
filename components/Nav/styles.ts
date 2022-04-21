import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ minWidth: string }>`
  display: flex;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: ${(props) => props.minWidth};
  padding: 10px 2px 10px 10px;
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
  background: ${(props) => props.theme.palette.accent};
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
  overflow-y: visible;
`;

export const NavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  > ${NavUlExternal}:hover {
    ${NavIndent} {
      opacity: 1;
    }
  }
`;

export const NavLi = styled.li<{ bottom: boolean }>`
  margin-top: ${(props) => (props.bottom ? 'auto' : 0)};
  color: ${(props) => props.theme.palette.dark};
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
    background: ${(props) => props.theme.palette.white};
  }
`;

export const NavItemLink = styled.a<{ isSelected: boolean; level: number }>`
  ${BaseNavItem}
  position: relative;
  display: block;
  padding-left: ${(props) => `${props.level * 10}px`};
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.palette.white : 'transparent'};

  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    content: '';
    box-shadow: ${(props) => (props.isSelected ? props.theme.shadow.focus : 'none')};
    opacity: ${(props) => (props.isSelected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  :hover {
    background: ${(props) => props.theme.palette.white};
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
