import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
  NODE_ENV: nodeEnv
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const HOSTNAME = nodeEnv === 'production' ? 'https://minimalist-spotify.netlify.app' : 'http://localhost:3000';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const REDIRECT_URI = `${HOSTNAME}/api/spotify/redirects`;

export const getAuthorizationCode = async (code: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }),
  });
  return response.json();
}

// Deprecated in favor of getAuthorizationCode below.
export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  return response.json();
};

export const getNowPlaying = async (access_token: string) => {
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async (access_token: string) => {
  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
