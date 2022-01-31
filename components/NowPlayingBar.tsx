import { SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import PlayerControls from 'components/PlayerControls';
import { useAppSelector } from 'redux/hooks';
import { selectPlayerState } from 'redux/reducers/playerStateSlice';
import audioWave from 'public/icons8-audio-wave.gif';
import downArrow from 'public/light-icons8-down-24.png';
import styles from 'styles/NowPlaying.module.scss';

export default function NowPlaying() {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const playerState = useAppSelector(selectPlayerState);
  const currentTrack = playerState?.track_window?.current_track;
  const artists = currentTrack?.artists.map((artist: Record<string, any>) => artist.name).join(', ');
  const trackName = currentTrack?.name;
  const albumArt = currentTrack?.album.images[0].url;
  const albumArtSize = isMaximized ? 300 : 70;

  function handleNowPlayingBarClick(e: SyntheticEvent) {
    const isSpotifyPlayerControl = (e.target as HTMLElement).classList.value.includes('SpotifyPlayer');
    const shouldMaximize = !isMaximized && !isSpotifyPlayerControl;
    if (shouldMaximize) {
      setIsMaximized(!isMaximized);
    }
  }

  function handleMinimizeClick() {
    setIsMaximized(!isMaximized);
  }

  return (
    <aside className={styles.ModalLayer}>
      <div className={`${styles.NowPlaying} ${isMaximized && styles.maximized}`} onClick={handleNowPlayingBarClick}>
        {isMaximized &&
          <div className={styles.downArrow} onClick={handleMinimizeClick}>
            <Image src={downArrow} width={24} height={24} alt='Down Arrow' />
          </div>
        }
        {albumArt &&
            <div className={styles.albumArt}>
              <Image src={albumArt} width={albumArtSize} height={albumArtSize} alt='Album Art' unoptimized={true} />
            </div>
        }
        {!playerState?.paused &&
            <Image src={audioWave} width={60} height={60} alt='Audio Wave' unoptimized={true} />
        }
        {artists && trackName &&
          <div>{trackName} • <span className={styles.artists}>{artists}</span></div>
        }
        <PlayerControls />
      </div>
    </aside>
  );
};
