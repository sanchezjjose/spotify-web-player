import { useState } from 'react';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import styles from 'styles/SpotifyPlayer.module.scss';

export default function PlayerControls({ player }: any) {
  // Move to Redux store (update when playing here or in Tracks component)
  const [playing, setPlaying] = useState<boolean>(false);

  function handlePlayClick() {
    if (player) {
      playing ? player.pause() : player.resume();
      setPlaying(!playing);
    }
  }

  return (
    <div className={styles.SpotifyPlayer}>
      {playing ? 
        <PauseIcon onClick={handlePlayClick} className={styles.pauseButton} /> :
        <PlayIcon onClick={handlePlayClick} className={styles.playButton} />
      }
    </div>
  );
};
