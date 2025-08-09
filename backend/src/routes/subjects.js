const express = require('express');
const { getSubjects, getChapters, getFlashcards, getQuizzes } = require('../models/content');
const { authMiddleware } = require('../models/user');

const router = express.Router();

// Optionally protect routes; for demonstration we require auth for reading flashcards/quizzes.

// GET /subjects
router.get('/', (req, res) => {
  const subjects = getSubjects();
  res.json(subjects);
});

// GET /subjects/:id/chapters
router.get('/:id/chapters', (req, res) => {
  const chapters = getChapters(req.params.id);
  res.json(chapters);
});

// GET /subjects/:id/flashcards
router.get('/:id/flashcards', authMiddleware, (req, res) => {
  const flashcards = getFlashcards(req.params.id);
  res.json(flashcards);
});

// GET /subjects/:id/quizzes
router.get('/:id/quizzes', authMiddleware, (req, res) => {
  const quizzes = getQuizzes(req.params.id);
  res.json(quizzes);
});

module.exports = router;