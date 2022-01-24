import { SyntheticEvent } from 'react';
import { SpotifyTrack } from 'lib/types';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectDeviceId } from 'redux/reducers/deviceIdSlice';
import styles from 'styles/Track.module.scss';

interface TrackProps {
  player: any,
  track: SpotifyTrack
}

export default function Track({ player, track }: TrackProps) {
  const artists = track.artists.map(artist => artist.name).join(', ');
  const deviceId = useAppSelector(selectDeviceId);

  function handleClick(e: SyntheticEvent, spotifyURI: string) {
    e.preventDefault();
    player.play(deviceId, spotifyURI);
  }

  return (
    <div className={styles.Track}>
      <b><a onClick={e => handleClick(e, track.uri)} href={track.uri}>{track.name}</a></b>
      {' '}{artists}
    </div>
  );
};
