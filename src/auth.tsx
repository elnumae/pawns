import { OAuth2AuthCodePKCE, AccessContext } from "@bity/oauth2-auth-code-pkce";

export const lichessHost = "https://lichess.org";
export const scopes = ["email:read", "challenge:read", "challenge:write", "challenge:bulk", "board:play"];
export const clientId = "pawns.chess"; // Your Lichess OAuth app client ID

export const clientUrl = (() => {
  const url = new URL(window.location.href);
  url.search = "";
  return url.href;
})();

// Initialize OAuth2
export const oauth = new OAuth2AuthCodePKCE({
  authorizationUrl: `${lichessHost}/oauth`,
  tokenUrl: `${lichessHost}/api/token`,
  clientId,
  scopes,
  redirectUrl: clientUrl,
  onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken(),
  onInvalidGrant: () => logout(),
});

export let accessContext: AccessContext | undefined;

// Check if returning from OAuth login
export async function initAuth() {
  const hasAuthCode = await oauth.isReturningFromAuthServer();
  if (hasAuthCode) {
    accessContext = await oauth.getAccessToken();
    return true;
  }
  return false;
}

// Login function
export async function login() {
  await oauth.fetchAuthorizationCode();
}

// Logout function
export async function logout() {
  const token = accessContext?.token?.value;
  accessContext = undefined;

  await fetch(`${lichessHost}/api/token`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  window.location.reload(); // Refresh to reset state
}

// Fetch user email from Lichess
export async function getUserEmail(): Promise<string | null> {
  if (!accessContext) return null;

  const fetchClient = oauth.decorateFetchHTTPClient(window.fetch);
  const res = await fetchClient(`${lichessHost}/api/account/email`);
  const data = await res.json();
  return data.email || null;
}
