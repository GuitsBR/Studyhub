import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError(t('login.error'));
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-semibold mb-4 text-center">{t('login.title')}</h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm" htmlFor="username">
            {t('login.username')}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm" htmlFor="password">
            {t('login.password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded focus:outline-none"
        >
          {t('login.signIn')}
        </button>
        <p className="text-xs mt-2 text-center text-gray-500 dark:text-gray-400">
          {t('login.register')} (demo/demo)
        </p>
      </form>
    </div>
  );
}