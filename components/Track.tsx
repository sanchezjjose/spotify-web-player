import { SpotifyTrack } from '../lib/types';

export default function Track(track: SpotifyTrack) {
    return (
        <div>
            <p><b>{track.name}</b></p>
            <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            <p>{track.uri}</p>
            <pre />
        </div>
    );
};
