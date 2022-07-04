import styled from 'styled-components';

export const ToggleTrack = styled.span`
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 22px;
  margin-right: 12px;
  border-radius: 20px;
  padding: 3px;
`;

export const ToggleThumb = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: ${(props) => props.theme.palette.white};
`;

export const ToggleWrapper = styled.button<{ $isOn: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  min-width: 140px;
  line-height: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 12pt;

  ${ToggleTrack} {
    justify-content: ${(props) => (props.$isOn ? 'end' : 'start')};
    background: ${(props) =>
      props.$isOn ? props.theme.palette.accent : props.theme.palette.gray2};
  }
`;
