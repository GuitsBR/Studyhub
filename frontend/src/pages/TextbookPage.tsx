import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Chapter {
  id: number;
  title: string;
  content: string;
}

export default function TextbookPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { t } = useTranslation();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    async function fetchChapters() {
      const res = await fetch(`/api/subjects/${subjectId}/chapters`);
      const data = await res.json();
      setChapters(data);
    }
    fetchChapters();
  }, [subjectId]);

  const filtered = chapters.filter((ch) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return ch.title.toLowerCase().includes(s) || ch.content.toLowerCase().includes(s);
  });

  function highlight(text: string) {
    // Convert newlines to <br> for simple formatting
    let html = text.replace(/\n/g, '<br/>');
    if (!search) return html;
    const s = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(s, 'gi'), (match) => `<mark>${match}</mark>`);
    return html;
  }

  return (
    <div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.map((chapter) => (
        <div key={chapter.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: highlight(chapter.content) }}
          />
        </div>
      ))}
    </div>
  );
}