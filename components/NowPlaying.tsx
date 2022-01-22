import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { NowPlayingTrack } from 'lib/types';
import { useAppSelector } from 'redux/hooks';
import { selectCredentials } from 'redux/reducers/credentialsSlice';
import PlayerControls from './PlayerControls';
import styles from 'styles/NowPlaying.module.scss';

export default function NowPlaying() {
  const credentials = useAppSelector(selectCredentials);
  const { accessToken } = credentials;

  const options = { refreshInterval: 10000 };
  const { data, error } = useSWR<NowPlayingTrack>(`/api/spotify/now-playing?access_token=${accessToken}`, fetcher, options);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading Now Playing...</div>;
  
  return (
    <div className={styles.NowPlaying}>
      <PlayerControls isPlaying={data.isPlaying} />
      {data.isPlaying ?
        <div>Now Playing <span>{data.title}</span></div> :
        <div>Not Playing.</div>
      }
    </div>
  );
};
