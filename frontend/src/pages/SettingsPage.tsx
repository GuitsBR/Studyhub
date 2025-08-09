import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [algorithm, setAlgorithm] = useState(() => localStorage.getItem('algorithm') || 'fsrs');
  const [dailyLimit, setDailyLimit] = useState(() => Number(localStorage.getItem('dailyLimit') || 20));
  const [language, setLanguage] = useState(() => i18n.language);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('algorithm', algorithm);
  }, [algorithm]);

  useEffect(() => {
    localStorage.setItem('dailyLimit', String(dailyLimit));
  }, [dailyLimit]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Theme</h3>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium mb-2">Algorithm</h3>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
        >
          <option value="fsrs">FSRS</option>
          <option value="sm2">SM-2</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium mb-2">Daily card limit</h3>
        <input
          type="number"
          value={dailyLimit}
          onChange={(e) => setDailyLimit(Number(e.target.value))}
          min={1}
          className="w-20 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
        />
      </div>
      <div>
        <h3 className="font-medium mb-2">Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
        >
          <option value="pt-BR">Português (BR)</option>
          <option value="en">English</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium mb-2">Data</h3>
        <p className="text-sm mb-2">Export and import your progress as JSON.</p>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded"
            onClick={() => {
              const data = JSON.stringify({});
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'studyhub-data.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </button>
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const json = JSON.parse(reader.result as string);
                    // TODO: import data
                    console.log('Imported', json);
                  } catch (err) {
                    // eslint-disable-next-line no-alert
                    alert('Invalid file');
                  }
                };
                reader.readAsText(file);
              }
            }}
            className="flex-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
}