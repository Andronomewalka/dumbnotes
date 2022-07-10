import styled from 'styled-components';
import { device } from 'utils/media';

export const SettingsWrapper = styled.div`
  position: relative;
`;

export const SettingsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 2px 0 0 0;
  border: none;
  background: ${(props) => props.theme.palette.background};

  svg {
    fill: ${(props) => props.theme.palette.gray};
    transition: all 0.3s ease;

    :hover {
      fill: ${(props) => props.theme.palette.dark};
    }
  }
`;

export const SettingsModalWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.palette.white};
  box-shadow: ${(props) => props.theme.shadow.focus};
  z-index: 10;

  @media ${device.tablet} {
    padding: 10px;
  }

  button {
    color: ${(props) => props.theme.palette.dark};
  }
`;
