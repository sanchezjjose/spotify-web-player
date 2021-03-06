// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring'

const {
  SPOTIFY_CLIENT_ID: client_id,
  NODE_ENV: nodeEnv
} = process.env;

const HOSTNAME = nodeEnv === 'production' ? 'https://minimalist-spotify.netlify.app' : 'http://localhost:3000';
const REDIRECT_URI = `${HOSTNAME}/api/spotify/redirects`;

const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = generateRandomString(16);
  const scope = 'user-read-currently-playing user-top-read user-modify-playback-state streaming user-library-read user-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
};
