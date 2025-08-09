import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface Flashcard {
  id: number;
  type: string;
  question: string;
  answer: string;
  options: string | null;
  tags: string | null;
}

export default function FlashcardsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { token } = useAuthContext();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch(`/api/subjects/${subjectId}/flashcards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setCards(data);
    }
    fetchCards();
  }, [subjectId, token]);

  function handleAnswer(answer: string) {
    const card = cards[index];
    if (!card) return;
    if (card.type === 'boolean' || card.type === 'input') {
      const correct = card.answer.trim().toLowerCase() === answer.trim().toLowerCase();
      setFeedback(correct ? 'correct' : 'incorrect');
    }
    setShowAnswer(true);
  }

  function nextCard() {
    setShowAnswer(false);
    setFeedback(null);
    setUserAnswer('');
    setIndex((prev) => (prev + 1) % cards.length);
  }

  if (cards.length === 0) {
    return <p>Loading...</p>;
  }

  const card = cards[index];
  const options = card.options ? JSON.parse(card.options) : null;
  return (
    <div>
      <div className="mb-4">
        <p>
          Card {index + 1} / {cards.length}
        </p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-700 rounded shadow-md">
        <p className="mb-4 font-medium">{card.question}</p>
        {!showAnswer && (
          <div>
            {card.type === 'boolean' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAnswer('true')}
                  className="px-4 py-2 bg-primary-600 text-white rounded"
                >
                  True
                </button>
                <button
                  onClick={() => handleAnswer('false')}
                  className="px-4 py-2 bg-primary-600 text-white rounded"
                >
                  False
                </button>
              </div>
            )}
            {card.type === 'input' && (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
                />
                <button
                  onClick={() => handleAnswer(userAnswer)}
                  className="mt-2 px-4 py-2 bg-primary-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            )}
            {card.type === 'self' && (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded"
              >
                Reveal Answer
              </button>
            )}
            {card.type === 'cloze' && (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded"
              >
                Reveal Answer
              </button>
            )}
            {card.type === 'image' && (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded"
              >
                Reveal Answer
              </button>
            )}
          </div>
        )}
        {showAnswer && (
          <div className="mt-4">
            {feedback && (
              <p className={`mb-2 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
              </p>
            )}
            {card.type === 'image' ? (
              <img src={card.question} alt={card.answer} className="mb-2 mx-auto max-h-60" />
            ) : null}
            <p className="italic">Answer: {card.answer}</p>
            <button
              onClick={nextCard}
              className="mt-2 px-4 py-2 bg-primary-600 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}