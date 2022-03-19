import type { AppProps } from 'next/app';
import { GlobalStyle, theme } from 'GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { getNavigation } from 'gapi/google-api';
import { MediaContextProvider } from 'components/Media';
import { Nav, NavNodeBaseType } from 'components/Nav';
import App from 'next/app';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/shared/lib/utils';

function MyApp({
  Component,
  pageProps,
  nav,
  error,
}: AppProps<{ nav: NavNodeBaseType[]; error: string }>) {
  console.log('pageProps', pageProps);
  console.log('nav', nav);
  console.log('error', error);
  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Wrapper>
          <Nav />
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </MediaContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  console.log('appContexta', appContext);
  const appProps = await App.getInitialProps(appContext);

  const res = {
    nav: [] as NavNodeBaseType[],
    error: '',
  };

  // try {
  //   const response = await getNavigation();
  //   if (response.data) {
  //     res.nav = response.data;
  //   } else {
  //     res.error = "Can't fetch navigation list";
  //   }
  // } catch (e: any) {
  //   res.error = e + '';
  // }

  return {
    ...appProps,
    ...res,
  };
};

export default MyApp;

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  background-color: ${(prop) => prop.theme.palette.lightGray};
  color: ${(prop) => prop.theme.palette.foreground};

  > section {
    flex: 1 0;
  }
`;
