import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import styles from 'styles/SpotifyPlayer.module.scss';

export default function PlayerControls({ player, isPlaying }: any) {
  const [playing, setPlaying] = useState<boolean>(isPlaying);

  useEffect(() => {
    console.log('PlayerControls::useEffect:[isPlaying]');
    setPlaying(isPlaying);
  }, [isPlaying]);

  function handleClick() {
    if (player) {
      if (playing) {
        player.pause();
        setPlaying(false);

      } else {
        player.resume();
        setPlaying(true);
      }
    }
  }

  return (
    <div className={styles.SpotifyPlayer}>
      {playing ? 
        <PauseIcon onClick={handleClick} className={styles.pauseButton} /> :
        <PlayIcon onClick={handleClick} className={styles.playButton} />
      }
    </div>
  );
};
