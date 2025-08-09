import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Atom, Calculator, FlaskConical, BookOpenText, ChevronsRight } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

interface Subject {
  id: number;
  name: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Physics: <Atom size={32} className="text-primary-500" />,
  Mathematics: <Calculator size={32} className="text-primary-500" />,
  Chemistry: <FlaskConical size={32} className="text-primary-500" />,
  Portuguese: <BookOpenText size={32} className="text-primary-500" />,
};

export default function HomePage() {
  const { t } = useTranslation();
  const { token, logout } = useAuthContext();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    async function fetchSubjects() {
      const res = await fetch('/api/subjects');
      const data = await res.json();
      setSubjects(data);
    }
    fetchSubjects();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('appName')}</h1>
        <button
          className="text-sm text-primary-600 hover:underline"
          onClick={() => logout()}
        >
          {t('logout')}
        </button>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {subjects.map((subject) => {
          const translated = t(`subjects.${subject.name.toLowerCase() as any}`, {
            defaultValue: subject.name,
          });
          return (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}/textbook`}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700 rounded shadow hover:shadow-md transition-shadow"
            >
              {iconMap[subject.name] ?? <ChevronsRight size={32} className="text-primary-500" />}
              <span className="mt-2 text-sm font-medium text-center">
                {translated}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}