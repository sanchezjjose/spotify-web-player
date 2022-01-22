import { SyntheticEvent } from 'react';
import { play } from './SpotifyPlayer';
import { SpotifyTrack } from 'lib/types';
import { useAppSelector } from 'redux/hooks';
import { selectDeviceId } from 'redux/reducers/deviceIdSlice';
import { selectPlayer } from 'redux/reducers/playerSlice';
import styles from 'styles/Track.module.scss';

interface TrackProps {
  track: SpotifyTrack
}

export default function Track({ track }: TrackProps) {
  const deviceId = useAppSelector(selectDeviceId);
  const player = useAppSelector(selectPlayer);

  function handleClick(e: SyntheticEvent, spotifyURI: string) {
    e.preventDefault();
    play({
      device_id: deviceId,
      spotify_uri: spotifyURI,
      playerInstance: player
    });
  }

  return (
    <div className={styles.Track}>
      <b><a onClick={e => handleClick(e, track.uri)} href={track.uri}>{track.name}</a></b>{' '}
      {track.artists.map(artist => artist.name).join(', ')}
    </div>
  );
};
