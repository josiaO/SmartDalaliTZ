import api from "../api/axios";

export type CurrentUser = {
  id: number;
  username: string;
  email?: string;
  role: "superuser" | "agent" | "user" | string;
};

// Start backend-first Google login (redirects to Django social login)
export function startGoogleLogin() {
  window.location.href = `${process.env.REACT_APP_API_BASE || "http://localhost:8000"}/accounts/google/login/`;
}

// Get current user (expects backend endpoint /api/me/)
export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  try {
    const { data } = await api.get("/me/");
    return data as CurrentUser;
  } catch (err) {
    return null;
  }
}

// Logout via backend endpoint
export async function logout() {
  try {
    await api.post("/logout/", {});
  } catch (e) {
    // ignore
  } finally {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
}

// If later using token-exchange: function to hit backend exchange endpoint
export async function exchangeFrontendToken(idToken: string) {
  const { data } = await api.post("/auth/exchange-token/", { id_token: idToken });
  if (data?.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }
  return data;
}