import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import styles from '../styles/Home.module.css'

import { NowPlayingTrack } from '../lib/types';

export default function NowPlaying({ access_token }: any) {
  const options = { refreshInterval: 10000 };
  const { data, error } = useSWR<NowPlayingTrack>(`/api/spotify/now-playing?access_token=${access_token}`, fetcher, options);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.NowPlaying}>
      {data.title ?
        <div>Now Playing <span>{data.title}</span></div> :
        <div>Not Playing.</div>
      }
    </div>
  );
};
