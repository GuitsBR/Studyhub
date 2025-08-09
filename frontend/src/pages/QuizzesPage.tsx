import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface Quiz {
  id: number;
  type: string;
  question: string;
  correct_answer: string;
  options: string;
}

export default function QuizzesPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { token } = useAuthContext();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function fetchQuizzes() {
      const res = await fetch(`/api/subjects/${subjectId}/quizzes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuizzes(data);
    }
    fetchQuizzes();
  }, [subjectId, token]);

  function submitAnswer() {
    const q = quizzes[index];
    if (selected.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()) {
      setScore((s) => s + 1);
    }
    if (index + 1 < quizzes.length) {
      setIndex(index + 1);
      setSelected('');
    } else {
      setFinished(true);
    }
  }

  if (quizzes.length === 0) return <p>Loading...</p>;
  if (finished) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Quiz Finished!</h3>
        <p>
          You scored {score} out of {quizzes.length}.
        </p>
      </div>
    );
  }

  const quiz = quizzes[index];
  const options: string[] = JSON.parse(quiz.options);

  return (
    <div>
      <div className="mb-4">
        <p>
          Question {index + 1} / {quizzes.length}
        </p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
        <p className="mb-4 font-medium">{quiz.question}</p>
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={(e) => setSelected(e.target.value)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
        <button
          onClick={submitAnswer}
          disabled={!selected}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}