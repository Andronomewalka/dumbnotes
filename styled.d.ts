import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      background: string;
      accent: string;
      white: string;
      black: string;
      gray: string;
      blue: string;
      dark: string;
      red: string;
    };
    shadow: {
      focus: string;
    };
  }
}
