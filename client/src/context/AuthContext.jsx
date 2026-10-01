import { createContext, useContext, useMemo, useState } from "react";

import { api } from "../services/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "claim-it-auth";

function loadStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.token && parsed?.user ? parsed : { token: null, user: null };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadStoredAuth);

  function saveAuth(nextAuth) {
    setAuth(nextAuth);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
  }

  async function login(credentials) {
    const data = await api.login(credentials);
    saveAuth({ token: data.token, user: data.user });
    return data.user;
  }

  async function register(credentials) {
    const data = await api.register(credentials);
    saveAuth({ token: data.token, user: data.user });
    return data.user;
  }

  function logout() {
    setAuth({ token: null, user: null });
    localStorage.removeItem(STORAGE_KEY);
  }

 const value = useMemo(
  () => ({
    token: auth.token,
    user: auth.user,
    isAuthenticated: Boolean(auth.token && auth.user),
    isAdmin: auth.user?.role === "admin",
    login,
    register,
    logout,
  }),
  [auth],
);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
