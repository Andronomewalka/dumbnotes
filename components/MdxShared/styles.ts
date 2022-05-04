import styled from 'styled-components';

export const MdxStaggerWrapper = styled.div<{ $stretch: boolean }>`
  height: ${(props) => (props.$stretch ? '100%' : 'auto')};
  width: ${(props) => (props.$stretch ? '100%' : 'auto')};
  max-width: ${(props) => (props.$stretch ? 'none' : '800px')};
  margin: ${(props) => (props.$stretch ? '0' : '0 auto')};
`;

export const PlainLink = styled.a`
  position: relative;
  color: ${(props) => props.theme.palette.blue};
  text-decoration: none;
  cursor: pointer;

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

export const MdxSubtitleWrapper = styled.h3`
  position: relative;
  margin-block-start: 1.5em;
  margin-block-end: 0.5em;
  scroll-margin-top: 90px;

  ::before {
    position: absolute;
    top: 0;
    left: -20px;
    content: '#';
    text-decoration: underline;
    margin-right: 5px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  :hover {
    ::before {
      opacity: 1;
    }
  }
`;

export const MdxInfoWrapper = styled.div`
  padding: 1.25rem;
  color: ${(props) => props.theme.palette.dark};
  background: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.shadow.focus};
  font-size: 11pt;
`;

export const MdxDisclaimerWrapper = styled.div`
  font-size: 10pt;
  color: ${(props) => props.theme.palette.gray};
`;

export const MdxSourcesWrapper = styled(MdxDisclaimerWrapper)`
  font-size: 12pt;
  ul {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const MdxImageWrapper = styled.div`
  span {
    position: unset !important;
  }

  img {
    position: unset !important;
    height: unset !important;
  }
`;
