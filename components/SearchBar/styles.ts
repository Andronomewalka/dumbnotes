import styled from 'styled-components';
import { mediaSize, device } from 'utils/media';

export const SearchBarWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  padding: 20px 20px 15px;
  background: ${(props) => props.theme.palette.background};
  z-index: 10;
`;

export const SearchBarFormWrapper = styled.form`
  position: relative;
  margin: 0 auto;
  max-width: ${mediaSize.laptopBreakpoint}px;
  flex: 1 0;

  @media ${device.mobile} {
    margin-left: 30px;
  }
`;

export const SearchBarInputIcon = styled.span`
  position: absolute;
  top: 5px;
  left: 9px;
  width: 21px;
`;

export const SearchBarInputWrapper = styled.input`
  width: 100%;
  height: 30px;
  padding: 4px 8px 4px 35px;
  border: 1px solid ${(props) => props.theme.palette.gray};
  border-radius: 20px;
  background: transparent;
  outline: none;
  font-size: 12pt;
  box-shadow: ${(props) => props.theme.shadow.focus};

  + ${SearchBarInputIcon} {
    svg {
      fill: ${(props) => props.theme.palette.gray};
    }
  }

  :focus {
    background: ${(props) => props.theme.palette.white};
    border: 2px solid ${(props) => props.theme.palette.blue};

    + ${SearchBarInputIcon} {
      svg {
        fill: ${(props) => props.theme.palette.blue};
      }
    }
  }
`;

export const SearchBarResultsContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 400px;
  z-index: 10;

  @media ${device.mobile} {
    font-size: 12pt;
    width: 325px;
  }
`;

export const SearchBarResultsUl = styled.ul`
  max-height: 600px;
  background: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.shadow.focus};
  padding: 20px;
  margin: 0;
  list-style: none;
  overflow: auto;

  @media ${device.mobile} {
    padding: 10px;
    max-height: 350px;
  }
`;

export const SearchBarResultsLi = styled.li`
  position: relative;
  a {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    cursor: pointer;
    z-index: 1;

    :focus {
      outline: none;
    }
  }
`;

export const SearchBarResultsLiHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.palette.gray2};
  border-radius: ${(props) => props.theme.borderRadius};
  z-index: 0;
`;

export const SearchBarResultsNoItems = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette.dark};
`;
