import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { NowPlayingSong } from '../lib/types';

export default function NowPlaying() {
    const options = { refreshInterval: 1000 };
    const { data } = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher, options);

    if (!data) {
      return null;
    }

    return (
        <div>Now Playing {data.title}</div>
    );
};
