import styled from 'styled-components';

export const ExpandButton = styled.button<{ isOpen: boolean }>`
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

  svg {
    fill: ${(props) => props.theme.palette.gray};
    transition: all 0.3s ease;

    :hover {
      fill: ${(props) => props.theme.palette.dark};
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 0 12px;
`;

export const Divider = styled.hr`
  position: relative;
  height: 100%;
  transform: scaleX(2);
  border: 1px solid ${(props) => props.theme.palette.accent};
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
    transition: 0.2s all ease;
  }

  :hover {
    &.is-open {
      transform: scaleX(6);
      cursor: col-resize;
      ::after {
        transform: scaleX(0.2) translate(-50%, -50%);
      }
    }
  }
`;
