// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from 'lib/spotify';
import { NowPlayingTrack } from 'lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<NowPlayingTrack>) {
  const access_token = req.query.access_token as string;
  const nowPlayingResponse = await getNowPlaying(access_token);

  if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await nowPlayingResponse.json();
  const isPlaying = song.is_playing;
  const id = song.item.id;
  const title = song.item.name;
  const artist = song.item.artists.map((artist: any) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return res.status(200).json({
    id,
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
}
