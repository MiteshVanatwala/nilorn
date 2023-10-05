const AUTH_URL =
  process.env.REACT_APP_AUTH_URL ?? 'https://identitytest.nilorn.com';
const APP_URL = process.env.REACT_APP_REDIRECT_URL ?? 'https://localhost:3000';
const CLIENT_ID = process.env.REACT_APP_IDENTITY_CLIENT_ID ?? 'umbrella';

export const IDENTITY_CONFIG = {
  authority: AUTH_URL, // The URL of the OIDC provider.
  client_id: CLIENT_ID, // Cient application's identifier as registered with the OIDC provider.
  redirect_uri: APP_URL + '/signin-oidc', // The URI of your client application to receive a response from the OIDpauthC provider.
  login: AUTH_URL, // The URL of the OIDC provider.
  post_logout_redirect_uri: APP_URL, // (string): The OIDC post-logout redirect URI.
  responseType: 'code', // The type of response desired from the OIDC provider.
  scope: 'nilorn-umbrella-api openid', // The scope being requested from the OIDC provider.
  loadUserInfo: true,
};
