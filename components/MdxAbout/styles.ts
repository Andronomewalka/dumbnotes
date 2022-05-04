import { MdxDisclaimerWrapper } from 'components/MdxShared';
import styled from 'styled-components';
import { device } from 'utils/media';

export const MdxAboutWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.1fr 0.1fr;
  gap: 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px 20px 0;

  @media ${device.mobile} {
    padding: 15px 0 0;
  }

  @media (max-height: 730px) {
    height: auto;
  }
`;

export const MdxAboutInfoWrapper = styled.div`
  position: relative;
  max-width: 900px;
  padding: 0 30px;
  border-radius: 10px;
  font-size: 14pt;
  background: ${(props) => props.theme.palette.white};
  box-shadow: ${(props) => props.theme.shadow.focus};

  h4 {
    margin: 0;
  }

  p {
    margin-top: 0;
  }

  @media ${device.mobile} {
    font-size: 12pt;
    padding: 0 20px;

    h3 {
      margin-block-end: 0.7em;
    }

    p {
      margin-block-end: 0.7em;
    }
  }
`;

export const MdxAboutInfoImageContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 30px;
  opacity: 0.7;
  font-size: 0;
  mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 70%);
`;

export const MdxAboutDisclaimerWrapper = styled(MdxDisclaimerWrapper)`
  width: 560px;
  margin: 0 10px;
  text-align: center;

  @media ${device.mobile} {
    width: auto;
  }
`;

export const MdxAboutLinksWrapper = styled.ul`
  &&& {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 13px 40px;
    margin: 0;
    border-radius: 10px;
    gap: 40px;
    background: #ebf1facc;
    list-style: none;

    @media ${device.mobile} {
      padding: 10px 20px;
      gap: 15px;
    }

    @media (max-height: 730px) {
      margin-bottom: 20px;
    }
  }
`;

export const MdxAboutLinkItemWrapper = styled.li`
  position: relative;
  font-size: 9pt;
  color: ${(props) => props.theme.palette.gray};
  width: 40px;
  margin: 0 8px;

  ::after {
    position: absolute;
    left: 50%;
    bottom: -8px;
    content: '';
    width: 50%;
    height: 5px;
    border-radius: 50px;
    background: ${(props) => props.theme.palette.accent};
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  :hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  @media ${device.mobile} {
    width: 25px;
    font-size: 8pt;
  }
`;

export const MdxAboutLinkA = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MdxAboutLinkDivider = styled.li`
  width: 2px;
  align-self: stretch;
  background: ${(props) => props.theme.palette.gray};
`;
