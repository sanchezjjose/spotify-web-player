// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { getAuthorizationCode } from '../../../lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // code = AQAMDkZ7F7JE3Ozdk9LKNRbEuTAYHG0AKQ1AYUoQn1vpiXNDv6kL52_ST6eUTL16otojzGZRmKtRnObKt-Vy5gn9jypDPOw8YmkJIKvEa19yaxsSOVAllHGV2z4bvL2PwhUtITBxEAJTGMpMsU2bpbGmPhq1cFF1Qp4Qspi-5lrP6JylwqGTgEG3kjeWn92G51o7g08mC0Bz29t7Al25v1rpS7IQamoJ4FKox6mwxLzbDTqp4mxSoU1R6UFlcT33Ogss9vjNHxsfiJ82RSRh0_QpkZFvRkz-ZtWpym2ZPob5BmUWreVYCzjMyGaGSuHBByPvgHw
  // state = FXre49uxm2a2fK03
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
