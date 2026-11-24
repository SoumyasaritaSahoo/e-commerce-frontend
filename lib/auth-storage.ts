const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const AUTH_CHANGE_EVENT = "auth-storage";
const ROLE_COOKIE_KEY = "role";

// proxy.ts reads this cookie to gate /account, /cart, /checkout etc. by
// role — it can't read localStorage (middleware runs on the server), so the
// role has to be mirrored into a plain cookie alongside the tokens.
function setRoleCookie(role: string, remember: boolean) {
  const maxAge = remember ? `; max-age=${60 * 60 * 24 * 7}` : "";
  document.cookie = `${ROLE_COOKIE_KEY}=${role}; path=/${maxAge}; samesite=lax`;
}

function clearRoleCookie() {
  document.cookie = `${ROLE_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}

// localStorage writes from the same tab don't fire the native "storage"
// event (only other tabs receive it), so we dispatch our own event here to
// keep same-tab subscribers (e.g. SiteHeader) in sync immediately.
function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

// "Remember me" decides which storage a session lives in: localStorage
// survives browser restarts, sessionStorage clears when the tab closes.
// Reads check both so either kind of session is recognized.
function activeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  if (window.localStorage.getItem(REFRESH_TOKEN_KEY)) return window.localStorage;
  if (window.sessionStorage.getItem(REFRESH_TOKEN_KEY)) return window.sessionStorage;
  return null;
}

export function setTokens(
  tokens: { access: string; refresh: string },
  remember = true,
  role?: string,
) {
  clearTokens();
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  storage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
  if (role) setRoleCookie(role, remember);
  notifyAuthChange();
}

export function setAccessToken(token: string) {
  activeStorage()?.setItem(ACCESS_TOKEN_KEY, token);
}

export function setRefreshToken(token: string) {
  activeStorage()?.setItem(REFRESH_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return activeStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return activeStorage()?.getItem(REFRESH_TOKEN_KEY) ?? null;
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  clearRoleCookie();
  notifyAuthChange();
}

export function getIsAuthed(): boolean {
  return Boolean(getAccessToken());
}

export function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
