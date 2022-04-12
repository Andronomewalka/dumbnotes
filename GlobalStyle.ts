import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  borderRadius: '5px',
  palette: {
    background: '#F4F9FD',
    accent: '#3BEEB7',
    white: '#FFFFFF',
    black: '#010101',
    gray: '#AFAFAF',
    blue: '#115BFA',
    dark: '#4F4F4F',
    red: '#F4023C',
  },
  shadow: {
    focus: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
};

export const GlobalStyle = createGlobalStyle`

  * {
  	box-sizing: border-box;
  }

  html,
  body,
	#__next {
	  height: 100%;
	  width: 100%;
	}

  html,
  body {
	  overflow-x: hidden;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

	img,
	svg {
    display: inline;
	}

	a {
	  text-decoration: none;
	  color: inherit;
	}
`;
