import { AppProps } from 'next/app';
import Head from 'next/head';
import { NavBar } from '../components';
import './styles.css';
import { wrapper } from '../store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coder Flashcards</title>
      </Head>
      <main className="app">
        <NavBar />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
