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
      backgroundHover: string;
      foreground: string;
      darkGray: string;
      lightGray1: string;
      lightGray2: string;
      whiteSemiTransparent: string;
      lightSplitter: string;
      error: string;
      primary: string;
    };
    shadow: {
      focus: string;
    };
  }
}
