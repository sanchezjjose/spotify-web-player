import Image from 'next/image';
import { useAppSelector } from 'redux/hooks';
import { selectPlayerState } from 'redux/reducers/playerStateSlice';
import PlayerControls from './PlayerControls';
import styles from 'styles/NowPlaying.module.scss';
import audioWave from '../public/icons8-audio-wave.gif';

export default function NowPlaying({ player }: any) {
  const playerState = useAppSelector(selectPlayerState);
  const currentTrack = playerState.track_window?.current_track;
  const artists = currentTrack?.artists.map((artist: Record<string, any>) => artist.name).join(', ');
  const trackName = currentTrack?.name;
  const albumArt = currentTrack?.album.images[0].url;

  return (
    <div className={styles.NowPlaying}>
      {albumArt &&
          <div className={styles.albumArt}>
            <Image src={albumArt} width={70} height={70} alt='Album Art' />
          </div>
      }
      {!playerState.paused &&
          <Image src={audioWave} width={60} height={60} alt='Audio Wave' />
      }
      {artists && trackName &&
        <div>{trackName} • <span className={styles.artists}>{artists}</span></div>
      }
      <PlayerControls player={player} />
    </div>
  );
};
