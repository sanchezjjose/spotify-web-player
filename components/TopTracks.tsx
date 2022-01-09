import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { SpotifyTopTracks } from '../lib/types';
import Track from './Track';

export default function TopTracks() {
    const { data, error } = useSWR<SpotifyTopTracks>('/api/spotify/top-tracks', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            {data.items.map((track) => (
                <Track key={track.id} {...track} />
            ))}
        </>
    );
};