import styled from "styled-components";
import { device } from "utils/media";

export const MdxSettingsWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 1fr 2fr;
  justify-content: center;
  align-items: center;
`

export const MdxSettingsItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
`

export const MdxSettingsTitle = styled.h1`
  font-size: 4em;
  font-weight: 400;
  margin: 0 auto;

  @media ${device.tablet} {
    font-size: 2.5em;
  }
`