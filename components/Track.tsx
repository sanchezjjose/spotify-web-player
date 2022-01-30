import { SyntheticEvent } from 'react';
import { SpotifyTrack } from 'lib/types';
import { useAppSelector } from 'redux/hooks';
import { selectCredentials } from 'redux/reducers/credentialsSlice';
import { selectDeviceId } from 'redux/reducers/deviceIdSlice';
import { play } from 'components/utils/player';
import styles from 'styles/Track.module.scss';

interface TrackProps {
  track: SpotifyTrack
}

export default function Track({ track }: TrackProps) {
  const { accessToken } = useAppSelector(selectCredentials);
  const deviceId = useAppSelector(selectDeviceId);
  const artists = track.artists.map(artist => artist.name).join(', ');

  function handleClick(e: SyntheticEvent, spotifyURI: string) {
    console.log(`Track :: accessToken ${accessToken} :: deviceId ${deviceId}`);
    e.preventDefault();
    if (accessToken && deviceId) {
      play(accessToken, deviceId, spotifyURI);
    }
  }

  return (
    <div className={styles.Track}>
      <span className={styles.trackName}>
        <a href={track.uri} onClick={e => handleClick(e, track.uri)}>{track.name}</a>
      </span>
      {' '}{artists}
    </div>
  );
};
