import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { NowPlayingTrack } from 'lib/types';
import PlayerControls from './PlayerControls';
import styles from 'styles/NowPlaying.module.scss';

export default function NowPlaying({ access_token, player }: any) {
  const options = { refreshInterval: 10000 };
  const { data, error } = useSWR<NowPlayingTrack>(`/api/spotify/now-playing?access_token=${access_token}`, fetcher, options);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading Now Playing...</div>;

  return (
    <div className={styles.NowPlaying}>
      <PlayerControls player={player} />
      {data.title ?
        <div>Now Playing <span>{data.title}</span></div> :
        <div>Not Playing.</div>
      }
    </div>
  );
};
