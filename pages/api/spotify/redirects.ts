// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthorizationCode } from 'lib/spotify';
import Cookies from 'cookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = (req.query.code as string);
  const state = (req.query.state as string);

  if (!state) {
    return res.status(500).json({ 'status': 'Error authorizing. State mismatch.' });
  }

  const {
    access_token,
    // token_type,
    // scope,
    expires_in,
    refresh_token
  } = await getAuthorizationCode(code);

  // TODO: Replace with safe authentication flow
  const cookies = new Cookies(req, res);
  const options = {
    httpOnly: true,
    path: '/',
    secureOnly: process.env.NODE_ENV !== 'development',
    maxAge: expires_in * 1000
  };
  cookies.set('access_token', access_token, options);
  cookies.set('refresh_token', refresh_token);

  res.redirect('/');
}
