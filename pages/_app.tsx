import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from 'GlobalStyle';
import { AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';
import { Settings } from 'components/Settings';
import { Nav } from 'components/Nav';
import { SearchBar } from 'components/SearchBar';
import { OwnThemeProvider } from 'components/OwnThemeProvider';
import { client } from 'utils/client';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <RecoilRoot>
        <OwnThemeProvider>
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
              <ContentWrapper data-id='content-wrapper'>
                <TopPanel>
                  <SearchBar />
                  <Settings />
                </TopPanel>
                {/* sometimes works weird on mobile on popstate*/}
                <AnimatePresence exitBeforeEnter>
                  <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
              </ContentWrapper>
            </Wrapper>
          </SWRConfig>
        </OwnThemeProvider>
      </RecoilRoot>
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

const ContentWrapper = styled.div`
  position: relative;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TopPanel = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  padding: 20px 20px 15px;
  background: ${(props) => props.theme.palette.background};
  z-index: 10;
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 20px;
`;

export default MyApp;
