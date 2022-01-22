import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import NowPlaying from 'components/NowPlaying';
import TopTracks from 'components/TopTracks';
import { init } from 'components/SpotifyPlayer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateDeviceId, selectDeviceId } from 'redux/reducers/deviceIdSlice';
import { updateCredentials } from 'redux/reducers/credentialsSlice';
import { updatePlayer } from 'redux/reducers/playerSlice';
import styles from 'styles/Home.module.scss';

const Home: NextPage = ({ credentials }: any) => {
  const dispatch = useAppDispatch();
  const deviceId = useAppSelector(selectDeviceId);

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
        </Head>

        <main className={styles.main}>
          <Image className={styles.spotifyLogo} src='/spotify.svg' width={32} height={32} alt='Spotify Logo' />
          <h1 className={styles.title}>Minimalist Spotify</h1>

          {!credentials.access_token &&
            <form action='/api/spotify/authorize'>
              <button className={styles.loginButton} type='submit'>Login to Spotify</button>
            </form>
          }

          {credentials.access_token && deviceId &&
            <>
              <NowPlaying />
              <TopTracks />
            </>
          }
        </main>

        <footer className={styles.footer}></footer>

        {credentials.access_token &&
          <Script
            src="https://sdk.scdn.co/spotify-player.js"
            onLoad={() => {
              init(
                'Minimalist Spotify Web Player',
                credentials.access_token,
                dispatch,
                updatePlayer,
                updateDeviceId
              );
            }}
          />
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
