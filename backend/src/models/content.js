const db = require('../db');

function getSubjects() {
  return db.prepare('SELECT id, name FROM subjects').all();
}

function getChapters(subjectId) {
  return db.prepare('SELECT id, title, content FROM chapters WHERE subject_id = ?').all(subjectId);
}

function getFlashcards(subjectId) {
  return db.prepare('SELECT id, type, question, answer, options, tags FROM flashcards WHERE subject_id = ?').all(subjectId);
}

function getQuizzes(subjectId) {
  return db.prepare('SELECT id, type, question, correct_answer, options FROM quizzes WHERE subject_id = ?').all(subjectId);
}

module.exports = {
  getSubjects,
  getChapters,
  getFlashcards,
  getQuizzes,
};