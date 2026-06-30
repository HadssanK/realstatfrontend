"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // { name, email, role, token }
  const [loading, setLoading] = useState(true);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("propfind_user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  }, []);

  function login(userData) {
    const payload = { ...userData };
    setUser(payload);
    localStorage.setItem("propfind_user", JSON.stringify(payload));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("propfind_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
