import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NowPlaying from 'components/NowPlaying';
import TopTracks from 'components/TopTracks';
import SpotifyPlayer from 'components/SpotifyPlayer';
import { useAppDispatch } from 'redux/hooks';
import { updateCredentials } from 'redux/reducers/credentialsSlice';
import styles from 'styles/Home.module.scss';

const Home: NextPage = ({ credentials }: any) => {
  const [player, setPlayer] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Home::useEffect - Updating Credentials...');
    dispatch(updateCredentials(credentials));
  }, [dispatch, credentials, credentials.access_token, credentials.refresh_token]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Minimalist Spotify</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
        </Head>

        <main className={styles.main}>
          <Image className={styles.spotifyLogo} src='/spotify.svg' width={32} height={32} alt='Spotify Logo' />
          <h1 className={styles.title}>Minimalist Spotify</h1>

          {!credentials.access_token &&
            <form action='/api/spotify/authorize'>
              <button className={styles.loginButton} type='submit'>Login to Spotify</button>
            </form>
          }

          {player &&
            <>
              <TopTracks player={player} />
              <NowPlaying player={player} />
            </>
          }
        </main>

        {credentials.access_token &&
          // <SpotifyPlayer credentials={credentials} setPlayer={setPlayer} />
          <SpotifyPlayer {...{ credentials, setPlayer }} />
        }
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
      credentials: {
        access_token,
        refresh_token
      }
    }
  }
}

export default Home
