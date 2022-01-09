import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { NowPlayingTrack } from '../lib/types';

export default function NowPlaying() {
    const options = { refreshInterval: 10000 };
    const { data, error } = useSWR<NowPlayingTrack>('/api/spotify/now-playing', fetcher, options);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            {data.title ?
                <div>Now Playing {data.title}</div> :
                <div>Not Playing.</div>
            }
            <a href='/top-tracks'>My Top Tracks</a>
        </>
    );
};
