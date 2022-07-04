import styled, { css } from 'styled-components';

export const ThemeSelectorLi = styled.li`
	width:100px;
	position: relative;
`;

export const ThemeSelectorLiContent = styled.div<{isSelected: boolean}>`
  position: relative;
  top: 0;
  left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: default;
	z-index: 1;
	padding: 10px;
	margin: 0 auto;
  
	:focus {
		outline: none;
	}

  ::after {
    position: absolute;
    left: 50%;
    bottom: 0px;
    content: '';
    width: 50%;
    height: 5px;
    border-radius: 50px;
    background: ${(props) => props.theme.palette.accent};
    transform: ${(props) => props.isSelected ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)'};
    transform-origin: center;
    transition: transform 0.3s ease;
  }
`;

export const ThemeSelectorLiHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.palette.gray3};
  border-radius: ${(props) => props.theme.borderRadius};
  z-index: 0;
`

export const ThemeSelectorUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 0;
	list-style: none;
`;