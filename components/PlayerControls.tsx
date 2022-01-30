import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { useAppSelector } from 'redux/hooks';
import { selectCredentials } from 'redux/reducers/credentialsSlice';
import { selectPlayerState } from 'redux/reducers/playerStateSlice';
import useSpotifyPlayer from 'components/hooks/useSpotifyPlayer';
import styles from 'styles/SpotifyPlayer.module.scss';

export default function PlayerControls() {
  const playerState = useAppSelector(selectPlayerState);
  const { accessToken } = useAppSelector(selectCredentials);
  const { player, loading }: any = useSpotifyPlayer('Minimalist Web Player', accessToken);

  console.log('PlayerControls :: playerState.paused', playerState.paused);

  async function handleTogglePlay() {
    if (playerState.paused) {
      await player.resume();
    } else {
      await player.pause();
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.SpotifyPlayer}>
      {playerState.paused ? 
        <PlayIcon onClick={handleTogglePlay} className={styles.playButton} /> :
        <PauseIcon onClick={handleTogglePlay} className={styles.pauseButton} />
      }
    </div>
  );
};
