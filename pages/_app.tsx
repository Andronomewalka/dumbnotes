import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle, theme } from 'GlobalStyle';
import { AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import { client } from 'utils/client';
import { Nav } from 'components/Nav';
import { SearchBar } from 'components/SearchBar';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ThemeProvider theme={theme}>
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
          <Wrapper>
            <Nav />
            <ComponentWrapper data-id='content-wrapper'>
              <SearchBar />
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </ComponentWrapper>
          </Wrapper>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

const Wrapper = styled.main`
  position: relative;
  display: flex;
  height: 100%;
  background-color: ${(prop) => prop.theme.palette.background};
  color: ${(prop) => prop.theme.palette.dark};
  overflow: hidden;
`;

const ComponentWrapper = styled.div`
  position: relative;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default MyApp;
