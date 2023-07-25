const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.json());

const questions = [
  {
    caption: 'Подія натискання на елемент називається click?',
    correctAnswer: true,
  },
  {
    caption: 'Усередині розмітки не можна додати обробник події?',
    correctAnswer: false,
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopImmediatePropagation?',
    correctAnswer: false,
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopPropagation?',
    correctAnswer: true,
  },
];
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../client/index.html');
  res.sendFile(filePath);
});
app.get('/questions', (req, res) => {
  res.json(questions);
});

app.post('/check-answers', (req, res) => {
  const userAnswers = req.body.answers;
  if (!userAnswers || userAnswers.length !== questions.length) {
    res.status(400).json({ error: 'Invalid answers format' });
    return;
  }

  let correctAnswersCount = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      correctAnswersCount++;
    }
  }

  res.json({ correctAnswers: correctAnswersCount, totalQuestions: questions.length });
});
app.get('/styles.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  const filePath = path.join(__dirname, '../client/styles.css');
  res.sendFile(filePath);
});
app.get('/script.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  const filePath = path.join(__dirname, '../client/script.js');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
