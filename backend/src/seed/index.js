const db = require('../db');

/**
 * Insert initial data into the database if not already present.
 */
function seed() {
  const subjectStmt = db.prepare('INSERT OR IGNORE INTO subjects (id, name) VALUES (?, ?)');
  const chapterStmt = db.prepare('INSERT OR IGNORE INTO chapters (id, subject_id, title, content) VALUES (?, ?, ?, ?)');
  const flashcardStmt = db.prepare('INSERT OR IGNORE INTO flashcards (id, subject_id, type, question, answer, options, tags) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const quizStmt = db.prepare('INSERT OR IGNORE INTO quizzes (id, subject_id, type, question, correct_answer, options) VALUES (?, ?, ?, ?, ?, ?)');

  const subjects = [
    { id: 1, name: 'Physics' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'Chemistry' },
    { id: 4, name: 'Portuguese' },
  ];
  for (const subj of subjects) {
    subjectStmt.run(subj.id, subj.name);
  }

  // Define chapter content.  For o conteúdo de exemplo, usamos
  // markdown simples com LaTeX inline para mostrar fórmulas.
  const chapters = [
    {
      id: 1,
      subject_id: 1,
      title: 'Introdução à Física',
      content: '# Introdução\n\nA Física estuda os fenômenos da natureza.  A primeira lei de Newton afirma que $$F=ma$$, onde $F$ é a força resultante, $m$ é a massa e $a$ é a aceleração.'
    },
    {
      id: 2,
      subject_id: 2,
      title: 'Números Reais',
      content: '# Números Reais\n\nOs números reais incluem racionais e irracionais.  A equação quadrática é dada por $$ax^2+bx+c=0$$ com solução $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$.'
    },
    {
      id: 3,
      subject_id: 3,
      title: 'Estrutura Atômica',
      content: '# Estrutura Atômica\n\nOs átomos são compostos de prótons, nêutrons e elétrons.  A notação isotópica é $^{14}_{7}\mathrm{N}$.'
    },
    {
      id: 4,
      subject_id: 4,
      title: 'Gramática Básica',
      content: '# Gramática Básica\n\nEm português, frases possuem sujeito e predicado.  **Exemplo:** "O gato dorme."'
    },
  ];
  for (const ch of chapters) {
    chapterStmt.run(ch.id, ch.subject_id, ch.title, ch.content);
  }

  // Define flashcards seeds for each subject (5 cards each)
  const flashcards = [];
  // Physics flashcards
  flashcards.push(
    { id: 1, subject_id: 1, type: 'boolean', question: 'A velocidade é a derivada da posição em relação ao tempo?', answer: 'true', options: null, tags: 'cinemática' },
    { id: 2, subject_id: 1, type: 'input', question: 'Qual é o valor aproximado da gravidade na Terra (m/s^2)?', answer: '9.8', options: null, tags: 'gravidade' },
    { id: 3, subject_id: 1, type: 'self', question: 'Explique a primeira lei de Newton.', answer: 'Autoavaliação', options: null, tags: 'dinâmica' },
    { id: 4, subject_id: 1, type: 'cloze', question: 'A energia cinética é dada por {{c1::1/2}}mv^2.', answer: '1/2', options: JSON.stringify({ cloze: ['1/2'] }), tags: 'energia' },
    { id: 5, subject_id: 1, type: 'image', question: 'physics_logo.png', answer: 'Física', options: null, tags: 'imagem' }
  );
  // Mathematics flashcards
  flashcards.push(
    { id: 6, subject_id: 2, type: 'boolean', question: 'O número π é racional?', answer: 'false', options: null, tags: 'números' },
    { id: 7, subject_id: 2, type: 'input', question: 'Resolva: 2 + 2 = ?', answer: '4', options: null, tags: 'aritmética' },
    { id: 8, subject_id: 2, type: 'self', question: 'Explique o teorema de Pitágoras.', answer: 'Autoavaliação', options: null, tags: 'geometria' },
    { id: 9, subject_id: 2, type: 'cloze', question: 'A derivada de x^n é {{c1::n}}x^{n-1}.', answer: 'n', options: JSON.stringify({ cloze: ['n'] }), tags: 'cálculo' },
    { id: 10, subject_id: 2, type: 'image', question: 'math_logo.png', answer: 'Matemática', options: null, tags: 'imagem' }
  );
  // Chemistry flashcards
  flashcards.push(
    { id: 11, subject_id: 3, type: 'boolean', question: 'A água é um composto?', answer: 'true', options: null, tags: 'química' },
    { id: 12, subject_id: 3, type: 'input', question: 'Qual é a fórmula da água?', answer: 'H2O', options: null, tags: 'fórmulas' },
    { id: 13, subject_id: 3, type: 'self', question: 'Descreva o modelo de Bohr.', answer: 'Autoavaliação', options: null, tags: 'estrutura atômica' },
    { id: 14, subject_id: 3, type: 'cloze', question: 'O ácido sulfúrico tem fórmula {{c1::H2SO4}}.', answer: 'H2SO4', options: JSON.stringify({ cloze: ['H2SO4'] }), tags: 'ácidos' },
    { id: 15, subject_id: 3, type: 'image', question: 'chem_logo.png', answer: 'Química', options: null, tags: 'imagem' }
  );
  // Portuguese flashcards
  flashcards.push(
    { id: 16, subject_id: 4, type: 'boolean', question: 'O verbo concorda com o sujeito em número?', answer: 'true', options: null, tags: 'gramática' },
    { id: 17, subject_id: 4, type: 'input', question: 'Como se escreve corretamente: "paralizar" ou "paralisar"?', answer: 'paralisar', options: null, tags: 'ortografia' },
    { id: 18, subject_id: 4, type: 'self', question: 'Explique a diferença entre crase e acento agudo.', answer: 'Autoavaliação', options: null, tags: 'acentuação' },
    { id: 19, subject_id: 4, type: 'cloze', question: 'A palavra {{c1::casa}} é um substantivo.', answer: 'casa', options: JSON.stringify({ cloze: ['casa'] }), tags: 'morfologia' },
    { id: 20, subject_id: 4, type: 'image', question: 'portuguese_logo.png', answer: 'Português', options: null, tags: 'imagem' }
  );

  for (const fc of flashcards) {
    flashcardStmt.run(fc.id, fc.subject_id, fc.type, fc.question, fc.answer, fc.options, fc.tags);
  }

  // Define quizzes seeds (5 per subject).  Each quiz has a question,
  // options array (as JSON string) e campo correct_answer (string) para
  // facilitar a verificação.
  const quizzes = [];
  // Physics
  quizzes.push(
    { id: 1, subject_id: 1, type: 'boolean', question: 'A luz se propaga em linha reta no vácuo.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 2, subject_id: 1, type: 'mcq', question: 'Qual grandeza está relacionada à resistência ao movimento?', correct_answer: 'Massa', options: JSON.stringify(['Velocidade', 'Massa', 'Tempo', 'Energia']) },
    { id: 3, subject_id: 1, type: 'mcq', question: 'Qual é a unidade de medida da força no SI?', correct_answer: 'Newton', options: JSON.stringify(['Joule', 'Watt', 'Newton', 'Pascal']) },
    { id: 4, subject_id: 1, type: 'boolean', question: 'O som não se propaga no vácuo.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 5, subject_id: 1, type: 'mcq', question: 'Qual partícula possui carga negativa?', correct_answer: 'Elétron', options: JSON.stringify(['Próton', 'Elétron', 'Neutrino', 'Nêutron']) }
  );
  // Math
  quizzes.push(
    { id: 6, subject_id: 2, type: 'boolean', question: '0 é um número inteiro.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 7, subject_id: 2, type: 'mcq', question: 'Qual é o valor de √9?', correct_answer: '3', options: JSON.stringify(['2', '3', '4', '5']) },
    { id: 8, subject_id: 2, type: 'mcq', question: 'A fórmula de Bhaskara é usada para resolver…', correct_answer: 'Equações quadráticas', options: JSON.stringify(['Equações lineares', 'Inequações', 'Equações quadráticas', 'Progressões']) },
    { id: 9, subject_id: 2, type: 'boolean', question: 'π é um número irracional.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 10, subject_id: 2, type: 'mcq', question: 'A soma dos ângulos internos de um triângulo é...', correct_answer: '180°', options: JSON.stringify(['180°', '90°', '360°', '270°']) }
  );
  // Chemistry
  quizzes.push(
    { id: 11, subject_id: 3, type: 'boolean', question: 'O elétron possui carga positiva.', correct_answer: 'false', options: JSON.stringify(['true', 'false']) },
    { id: 12, subject_id: 3, type: 'mcq', question: 'Qual é o símbolo químico do ouro?', correct_answer: 'Au', options: JSON.stringify(['Ag', 'Au', 'O', 'G']) },
    { id: 13, subject_id: 3, type: 'boolean', question: 'Átomos do mesmo elemento sempre possuem o mesmo número de prótons.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 14, subject_id: 3, type: 'mcq', question: 'Qual é o pH de uma solução neutra?', correct_answer: '7', options: JSON.stringify(['0', '7', '14', '10']) },
    { id: 15, subject_id: 3, type: 'mcq', question: 'O que é uma molécula?', correct_answer: 'Conjunto de átomos ligados', options: JSON.stringify(['Um átomo isolado', 'Conjunto de átomos ligados', 'Um tipo de cristal', 'Um elétron livre']) }
  );
  // Portuguese
  quizzes.push(
    { id: 16, subject_id: 4, type: 'boolean', question: 'No português, substantivos podem ser flexionados em gênero e número.', correct_answer: 'true', options: JSON.stringify(['true', 'false']) },
    { id: 17, subject_id: 4, type: 'mcq', question: 'Qual é o plural de "pão"?', correct_answer: 'pães', options: JSON.stringify(['pãos', 'pães', 'pães', 'pãez']) },
    { id: 18, subject_id: 4, type: 'boolean', question: 'O acento agudo sempre indica vogal aberta.', correct_answer: 'false', options: JSON.stringify(['true', 'false']) },
    { id: 19, subject_id: 4, type: 'mcq', question: 'Qual é o tempo verbal da frase "Eu estudei"?', correct_answer: 'Pretérito perfeito', options: JSON.stringify(['Futuro', 'Pretérito imperfeito', 'Presente', 'Pretérito perfeito']) },
    { id: 20, subject_id: 4, type: 'mcq', question: 'A palavra "amável" é um…', correct_answer: 'Adjetivo', options: JSON.stringify(['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio']) }
  );

  for (const q of quizzes) {
    quizStmt.run(q.id, q.subject_id, q.type, q.question, q.correct_answer, q.options);
  }

  // Create a demo user if none exists
  const userCount = db.prepare('SELECT COUNT(*) AS cnt FROM users').get().cnt;
  if (userCount === 0) {
    const bcrypt = require('bcryptjs');
    const passwordHash = bcrypt.hashSync('demo', 10);
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('demo', passwordHash);
    // eslint-disable-next-line no-console
    console.log('Inserted demo user (username="demo", password="demo").');
  }
}

if (require.main === module) {
  seed();
  // eslint-disable-next-line no-console
  console.log('Seed completed');
}

module.exports = seed;