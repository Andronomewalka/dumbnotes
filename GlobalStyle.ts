import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  borderRadius: '5px',
  palette: {
    background: '#F9FCFE',
    accent: '#3BEEB7',
    selected: '#EAEDF8',
    white: '#FFFFFF',
    black: '#010101',
    gray: '#AFAFAF',
    gray2: '#BFBFBF',
    gray3: '#F1F1F1',
    blue: '#115BFA',
    dark: '#4F4F4F',
    staticDark: '#4F4F4F',
    red: '#F4023C',
    violet: '#EEF3FB',
    whiteToSemiGray: '#FFFFFF',
  },
  shadow: {
    focus: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
  colorScheme: 'light',
};

export const darkTheme: DefaultTheme = {
  borderRadius: '5px',
  palette: {
    background: '#18191A',
    accent: '#35D2A3',
    selected: '#242526',
    white: '#010101',
    black: '#FFFFFF',
    gray: '#AFAFAF',
    gray2: '#BFBFBF',
    gray3: '#242526',
    blue: '#58a6ff',
    dark: '#dadde1',
    staticDark: '#4F4F4F',
    red: '#F4023C',
    violet: '#242526',
    whiteToSemiGray: '#242526',
  },
  shadow: {
    focus: 'none',
  },
  colorScheme: 'dark',
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
	  overflow: hidden;
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

  :root {
    color-scheme: ${(props) => props.theme.colorScheme};
  }
`;
