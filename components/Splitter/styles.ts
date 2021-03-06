import styled, { css } from 'styled-components';
import { device } from 'utils/media';

export const ExpandButton = styled.button.attrs({
  'aria-label': 'exapnd-button',
})<{ isOpen: boolean }>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) ${(props) => (props.isOpen ? '' : 'rotateZ(180deg)')};
  width: 30px;
  height: 30px;
  padding: 0;
  border: 2px solid ${(props) => props.theme.palette.accent};
  border-radius: 50%;
  background: ${(props) => props.theme.palette.background};
  transition: transform 0.3s linear;
  z-index: 2;

  svg {
    fill: ${(props) => props.theme.palette.gray};
    transition: all 0.3s ease;

    :hover {
      fill: ${(props) => props.theme.palette.dark};
    }
  }

  @media ${device.tablet} {
    position: fixed;
    left: 10px;
    transform: ${(props) => (props.isOpen ? '' : 'rotateZ(180deg)')};
    transition: transform 0.3s linear, left 0.3s linear;
  }
`;

export const Divider = styled.hr`
  position: relative;
  height: 100%;
  transform: scaleX(2);
  width: 2px;
  background: ${(props) => props.theme.palette.accent};
  border: none;
  margin: 0;
  overflow: visible;
  transition: 0.2s all ease;

  ::after {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scaleX(0) translate(-50%, -50%);
    transform-origin: left;
    content: '||';
    font-weight: bold;
    color: ${(props) => props.theme.palette.staticDark};
    transition: 0.2s all ease;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 10px 14px;

  @media ${device.tablet} {
    padding: 0;
  }
`;

const hoverCss = css`
  cursor: col-resize;
  & + ${Divider} {
    transform: scaleX(6);
    ::after {
      transform: scaleX(0.2) translate(-50%, -50%);
    }
  }
`;

export const HoverArea = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  :hover {
    ${(props) => props.isOpen && hoverCss}
  }

  &.hover-from-touch {
    ${(props) => props.isOpen && hoverCss}
  }
`;
