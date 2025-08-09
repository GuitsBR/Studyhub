const express = require('express');
const authRouter = require('./auth');
const subjectsRouter = require('./subjects');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/subjects', subjectsRouter);

router.get('/', (req, res) => {
  res.json({ message: 'StudyHub API' });
});

module.exports = router;