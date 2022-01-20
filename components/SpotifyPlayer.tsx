import Script from 'next/script';
import { useState } from 'react';

import { useAppDispatch } from 'redux/hooks';
import { updateDeviceId, selectDeviceId } from 'redux/reducers/deviceIdSlice';

import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { init } from './SpotifyPlayerInit';
import styles from 'styles/SpotifyPlayer.module.scss';

export default function SpotifyPlayer({ access_token, player, setPlayer }: any) {
  const [playing, setPlaying] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleTogglePlayClick() {
    if (player) {
      playing ? player.pause() : player.resume();
      setPlaying(!playing);
    }
  }

  return (
    <div className={styles.SpotifyPlayer}>
      {playing ? 
        <PauseIcon onClick={handleTogglePlayClick} className={styles.pauseButton} /> :
        <PlayIcon onClick={handleTogglePlayClick} className={styles.playButton} />
      }
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => {
          init(
            'Minimalist Spotify Web Player',
            access_token,
            setPlayer,
            dispatch,
            updateDeviceId
          );
        }}
      />
    </div>
  );
}
