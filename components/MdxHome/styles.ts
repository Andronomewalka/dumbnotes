import styled from 'styled-components';
import { MdxDisclaimerWrapper } from 'components/MdxShared';

export const MdxHomeWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MdxHomeDisclaimerWrapper = styled(MdxDisclaimerWrapper)`
  font-size: 12pt;
  width: 500px;
  margin: 0 10px;
  text-align: center;
`;
