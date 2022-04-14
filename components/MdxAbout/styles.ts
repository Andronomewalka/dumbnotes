import { MdxImage } from 'components/Mdx/MdxImage';
import styled from 'styled-components';

export const MdxAboutWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.1fr 0.1fr;
  gap: 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
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
`;

export const MdxAboutInfoImageContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 30px;
  opacity: 0.7;
  font-size: 0;
  mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 70%);
`;

export const MdxAboutDisclaimerWrapper = styled.div`
  width: 560px;
  margin: 0 10px;
  font-size: 10pt;
  text-align: center;
  color: ${(props) => props.theme.palette.gray};
`;

export const MdxAboutLinksWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 13px 40px;
  border-radius: 10px;
  gap: 40px;
  background: #ebf1facc;
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
