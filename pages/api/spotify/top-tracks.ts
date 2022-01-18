// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTopTracks } from 'lib/spotify';
import { SpotifyTopTracks } from 'lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyTopTracks | string>) {
  const access_token = req.query.access_token as string;
  const response = await getTopTracks(access_token);

  if (!response.ok) {
    return res.status(500).send('There was a problem requesting top tracks.')
  }

  const topTracks: SpotifyTopTracks = await response.json();

  return res.status(200).json(topTracks);
}
