import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { useTranslation } from 'react-i18next';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SubjectLayout from './pages/SubjectLayout';
import TextbookPage from './pages/TextbookPage';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizzesPage from './pages/QuizzesPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuthContext();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/subject/:subjectId/*"
        element={
          <RequireAuth>
            <SubjectLayout />
          </RequireAuth>
        }
      >
        <Route path="textbook" element={<TextbookPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}