import styled from 'styled-components';

export const MdxAboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const MdxAboutInfoWrapper = styled.div`
  width: 700px;
  padding: 50px;
  border-radius: 10px;
  margin: auto 0;
  font-size: 16pt;
  background: ${(props) => props.theme.palette.white};
  box-shadow: #ffffff26 0 0 0 1px, #32325d45 0 80px 120px -20px,
    #0000004d 0 30px 60px -10px;
`;

export const MdxAboutLinksWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 13px 40px;
  border-radius: 10px;
  gap: 40px;
  background: ${(props) => props.theme.palette.white};
  background-image: linear-gradient(290deg, #f4f9fd, #ebf1fa 80%);
  box-shadow: rgba(50, 50, 93, 0.2) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.25) 0px 25px 50px -20px;
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
