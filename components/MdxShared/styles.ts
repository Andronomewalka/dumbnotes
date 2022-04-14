import styled from 'styled-components';

export const MdxWrapper = styled.div`
  height: 100%;
  line-height: 1.7;
`;

export const MdxStaggerWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const PlainLink = styled.a`
  text-decoration: none;

  :hover {
    color: ${(props) => props.theme.palette.blue};
  }
`;

export const MdxDisclaimerWrapper = styled.div`
  font-size: 10pt;
  color: ${(props) => props.theme.palette.gray};
`;
