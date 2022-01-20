import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { SpotifyTopTracks } from 'lib/types';
import Track from './Track';
import styles from 'styles/TopTracks.module.scss';

export default function TopTracks({ access_token, player }: any) {
    const { data, error } = useSWR<SpotifyTopTracks>(`/api/spotify/top-tracks?access_token=${access_token}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading Top Tracks...</div>;

    return (
        <div className={styles.TopTracks}>
            {data.items.map((track) => (
                <Track key={track.id} track={track} player={player} />
            ))}
        </div>
    );
};
