import { useState, useEffect } from 'react';

export interface AuthContextValue {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): AuthContextValue {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  async function login(username: string, password: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  function logout() {
    setToken(null);
  }

  return { token, login, logout };
}