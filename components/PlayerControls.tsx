import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { useAppSelector } from 'redux/hooks';
import { selectPlayerState } from 'redux/reducers/playerStateSlice';
import styles from 'styles/SpotifyPlayer.module.scss';

export default function PlayerControls({ player, isPlaying }: any) {
  const playerState = useAppSelector(selectPlayerState);

  function handleClick() {
    if (playerState.paused) {
      player.resume();
    } else {
      player.pause();
    }
  }

  return (
    <div className={styles.SpotifyPlayer}>
      {playerState.paused ? 
        <PlayIcon onClick={handleClick} className={styles.playButton} /> :
        <PauseIcon onClick={handleClick} className={styles.pauseButton} />
      }
    </div>
  );
};
