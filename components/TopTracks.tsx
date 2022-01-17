import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { SpotifyTopTracks } from '../lib/types';
import styles from '../styles/Home.module.css'

import Track from './Track';

export default function TopTracks({ access_token }: any) {
    const { data, error } = useSWR<SpotifyTopTracks>(`/api/spotify/top-tracks?access_token=${access_token}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className={styles.TopTracks}>
            {data.items.map((track) => (
                <Track key={track.id} {...track} />
            ))}
        </div>
    );
};
