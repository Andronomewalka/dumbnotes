import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}

type ColorScheme = 'light' | 'dark';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      background: string;
      accent: string;
      selected: string;
      white: string;
      black: string;
      gray: string;
      gray2: string;
      gray3: string;
      blue: string;
      dark: string;
      staticDark: string;
      red: string;
      violet: string;
      whiteToSemiGray: string;
    };
    shadow: {
      focus: string;
    };
    colorScheme: ColorScheme;
  }
}
