import styled from 'styled-components';

export const MdxWrapper = styled.div`
  height: 100%;
  line-height: 1.7;
`;

export const MdxStaggerWrapper = styled.div<{ $stretch: boolean }>`
  height: ${(props) => (props.$stretch ? '100%' : 'auto')};
  width: ${(props) => (props.$stretch ? '100%' : 'auto')};
`;

export const PlainLink = styled.a`
  position: relative;
  text-decoration: none;
  color: ${(props) => props.theme.palette.blue};

  ::after {
    position: absolute;
    left: 50%;
    bottom: 0;
    content: '';
    width: 100%;
    height: 2px;
    border-radius: 50px;
    background: ${(props) => props.theme.palette.blue};
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  :hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

export const MdxDisclaimerWrapper = styled.div`
  font-size: 10pt;
  color: ${(props) => props.theme.palette.gray};
`;
