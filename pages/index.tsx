import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Login from 'components/Login';
import Header from 'components/Header';
import NowPlayingBar from 'components/NowPlayingBar';
import TopTracks from 'components/TopTracks';
import { useAppDispatch } from 'redux/hooks';
import { updateCredentials } from 'redux/reducers/credentialsSlice';
import styles from 'styles/Home.module.scss';

const Home: NextPage = ({ credentials }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Home :: useEffect :: updating credentials');
    dispatch(updateCredentials(credentials));
  }, [dispatch, credentials, credentials.access_token, credentials.refresh_token]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Minimalist Spotify</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
          <link rel="icon" href="/favicon.ico" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
        </Head>

        <main className={styles.main}>
          <div>
            {credentials.access_token ? (
              <div className='scrollableNode'>
                <Header />
                <TopTracks />
              </div>
              ) : <Login />
            }
          </div>

          {credentials.access_token &&
            <NowPlayingBar />
          }
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const {
    access_token = null,
    refresh_token = null
  } = context.req.cookies;

  return {
    props: {
      credentials: { access_token, refresh_token }
    }
  }
}

export default Home
