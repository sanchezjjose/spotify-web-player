import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { SpotifyTopTracks } from 'lib/types';
import styles from 'styles/TopTracks.module.scss'

import { useAppSelector } from 'redux/hooks';
import { selectDeviceId } from 'redux/reducers/deviceIdSlice';

import Track from './Track';

export default function TopTracks({ access_token, player }: any) {
    const { data, error } = useSWR<SpotifyTopTracks>(`/api/spotify/top-tracks?access_token=${access_token}`, fetcher);
    const deviceId = useAppSelector(selectDeviceId);

    if (error) return <div>Failed to load</div>;
    if (!data || !deviceId) return <div>Loading...</div>;

    return (
        <div className={styles.TopTracks}>
            {data.items.map((track) => (
                <Track key={track.id} track={track} deviceId={deviceId} player={player} />
            ))}
        </div>
    );
};
