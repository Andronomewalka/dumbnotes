import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { MediaContextProvider } from 'components/Media';
import { Nav } from 'components/Nav';
import { SWRConfig } from 'swr';
import { client } from 'utils/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <SWRConfig
            value={{
              fetcher: (url: string) =>
                client
                  .get(url)
                  .then((response) => response.data)
                  .catch((e) => void console.log(e)),
            }}
          >
            <Nav />
            <Component {...pageProps} />
          </SWRConfig>
        </Wrapper>
      </ThemeProvider>
    </MediaContextProvider>
  );
}

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  background-color: ${(prop) => prop.theme.palette.lightGray1};
  color: ${(prop) => prop.theme.palette.foreground};

  > section {
    flex: 1 0;
  }
`;

export default MyApp;
