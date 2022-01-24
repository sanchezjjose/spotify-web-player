import Image from 'next/image';
import { useAppSelector } from 'redux/hooks';
import { selectPlayerState } from 'redux/reducers/playerStateSlice';
import PlayerControls from './PlayerControls';
import styles from 'styles/NowPlaying.module.scss';
import audioWave from '../public/icons8-audio-wave.gif';

export default function NowPlaying({ player }: any) {
  const playerState = useAppSelector(selectPlayerState);

  return (
    <div className={styles.NowPlaying}>
      {playerState.paused ?
        <div>Not Playing.</div> :
        <>
          <Image className={styles.audioWaveImg} src={audioWave} width={60} height={60} alt='Audio Wave' />
          <div>Now Playing <span>{playerState.track_window.current_track.name}</span></div>
        </>
      }
      <PlayerControls player={player} />
    </div>
  );
};
