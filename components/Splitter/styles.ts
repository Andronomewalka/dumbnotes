import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0 8px;

  ::after {
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
    cursor: col-resize;
    ::after {
      transform: scaleX(1) translate(-50%, -50%);
    }
    > hr {
      transform: scaleX(6);
    }
  }
`;

export const Divider = styled.hr`
  position: relative;
  height: 100%;
  transform: scaleX(2);
  border: 1px solid ${(props) => props.theme.palette.accent};
  margin: 0;
  transition: 0.2s all ease;
`;
