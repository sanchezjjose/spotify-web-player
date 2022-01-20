import { SpotifyTrack } from 'lib/types';
import { SyntheticEvent } from 'react';

import { play } from './SpotifyPlayerInit';
import styles from 'styles/Track.module.scss'

interface TrackProps {
  track: SpotifyTrack,
  deviceId: string | null,
  player: any
}

export default function Track({ track, deviceId, player }: TrackProps) {
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
