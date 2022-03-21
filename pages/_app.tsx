import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { MediaContextProvider } from 'components/Media';
import { Nav, NavProvider } from 'components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <NavProvider>
          <Wrapper>
            <GlobalStyle />
            <Nav />
            <Component {...pageProps} />
          </Wrapper>
        </NavProvider>
      </ThemeProvider>
    </MediaContextProvider>
  );
}

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  background-color: ${(prop) => prop.theme.palette.lightGray};
  color: ${(prop) => prop.theme.palette.foreground};

  > section {
    flex: 1 0;
  }
`;

export default MyApp;
