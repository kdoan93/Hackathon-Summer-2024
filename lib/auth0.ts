import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  idTokenSigningAlg: 'RS256',
  session: {
    rollingDuration: 60 * 60 * 8, // 8 hours
    cookieSecret: process.env.SESSION_COOKIE_SECRET as string,
  },
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  },
});
