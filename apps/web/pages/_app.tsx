import { AppProps } from 'next/app';
import Head from 'next/head';
import { NavBar } from '../components';
import './styles.css';
import { wrapper } from '../store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2', // blueviolet
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coder Flashcards</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={customTheme}>
          <NavBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
