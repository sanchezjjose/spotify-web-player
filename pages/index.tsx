import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';
import SpotifyPlayer from '../components/SpotifyPlayer';

const Home: NextPage = ({ credentials }: any) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Minimalist Spotify</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Minimalist Spotify</h1>

          {!credentials.access_token &&
            <form action='/api/spotify/authorize'>
              <button type='submit'>Login to Spotify</button>
            </form>
          }

          <NowPlaying access_token={credentials.access_token} />
          <SpotifyPlayer access_token={credentials.access_token} />
          <TopTracks access_token={credentials.access_token} />
        </main>

        <footer className={styles.footer}></footer>
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
