import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import { MediaContextProvider } from 'components/Media';
import { Nav } from 'components/Nav';
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
  background-color: ${(prop) => prop.theme.palette.background};
  color: ${(prop) => prop.theme.palette.dark};
  overflow: auto;

  > :last-child {
    flex: 1 0;
    padding: 1rem;
  }
`;

export default MyApp;
