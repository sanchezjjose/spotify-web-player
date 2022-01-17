// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthorizationCode } from '../../../lib/spotify';

const Cookies = require('cookies');

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
  cookies.set('access_token', access_token, { maxAge: expires_in * 1000 });
  cookies.set('refresh_token', refresh_token);

  res.redirect('/');
}
