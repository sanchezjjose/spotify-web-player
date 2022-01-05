// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring'

type Data = {
  album?: string,
  albumImageUrl?: string,
  artist?: string,
  isPlaying: boolean,
  songUrl?: string,
  title?: string,
}

const {
  SPOTIFY_CLIENT_ID: client_id,
} = process.env;

const REDIRECT_URI = 'http://localhost:3000/api/spotify/now-playing';

const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const state = generateRandomString(16);
  const scope = 'user-read-currently-playing';

  console.log(client_id);

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
};
