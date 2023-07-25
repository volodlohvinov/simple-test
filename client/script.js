fetch('/questions')
  .then(response => response.json())
  .then(questions => {
    const questionsContainer = document.querySelector('.questions');
    questions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `
        <p><strong>Питання ${index + 1}:</strong> ${question.caption}</p>
        <label><input type="radio" name="answer${index}" value="true"> Так</label>
        <label><input type="radio" name="answer${index}" value="false"> Ні</label>
      `;
      questionsContainer.appendChild(questionDiv);
    });

    const checkButton = document.getElementById('checkButton');
    checkButton.disabled = true;
    checkButton.addEventListener('click', () => {
      const answers = [];
      for (let i = 0; i < questions.length; i++) {
        const answerValue = document.querySelector(`input[name="answer${i}"]:checked`)?.value;
        if (answerValue === undefined) {
          return; 
        }
        answers.push(answerValue === 'true');
      }

      fetch('/check-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      .then(response => response.json())
      .then(result => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <p>Кількість правильних відповідей: ${result.correctAnswers} з ${result.totalQuestions}</p>
        `;
      });
    });

    const answerInputs = document.querySelectorAll('input[type="radio"]');
    answerInputs.forEach(input => {
      input.addEventListener('change', () => {
        const allAnswered = Array.from(answerInputs).every(input => input.checked);
        checkButton.disabled = allAnswered;
      });
    });
  });

