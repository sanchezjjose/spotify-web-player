import { SpotifyTrack } from '../lib/types';

export default function Track(track: SpotifyTrack) {
    return (
        <div>
            <b><a href={track.uri}>{track.name}</a></b>{' '}
            {track.artists.map(artist => artist.name).join(', ')}
        </div>
    );
};
