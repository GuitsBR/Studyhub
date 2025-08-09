import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Subject {
  id: number;
  name: string;
}

export default function SubjectLayout() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { t } = useTranslation();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    async function fetchSubject() {
      const res = await fetch('/api/subjects');
      const data: Subject[] = await res.json();
      const s = data.find((d) => d.id === Number(subjectId));
      setSubject(s || null);
    }
    fetchSubject();
  }, [subjectId]);

  const basePath = `/subject/${subjectId}`;
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {subject ? t(`subjects.${subject.name.toLowerCase() as any}`, { defaultValue: subject.name }) : ''}
      </h2>
      <nav className="mb-4 border-b border-gray-200 dark:border-gray-600">
        <ul className="flex overflow-x-auto">
          {['textbook', 'flashcards', 'quizzes', 'stats', 'settings'].map((key) => (
            <li key={key} className="mr-4">
              <NavLink
                to={`${basePath}/${key}`}
                className={({ isActive }) =>
                  `pb-2 ${isActive ? 'border-b-2 border-primary-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'}`
                }
              >
                {t(`sections.${key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}