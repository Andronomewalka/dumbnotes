import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { MediaContextProvider } from 'components/Media';
import { Nav } from 'components/Nav';
import { SWRConfig } from 'swr';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <SWRConfig
            value={{
              fetcher: (url: string) => axios.get(url).then((response) => response.data),
            }}
          >
            <Nav />
          </SWRConfig>
          <Component {...pageProps} />
        </Wrapper>
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
