document.addEventListener('DOMContentLoaded', () => {
    const categories = {
      science: [
        { question: 'What is the chemical symbol for water?', answer: 'H2O', difficulty: 'easy' },
        { question: 'What is the chemical symbol for Chioroform?', answer: 'CHCl3', difficulty: 'easy' },
        { question: 'What planet is known as the Red Planet?', answer: 'Mars', difficulty: 'medium' },
        { question: 'Largest planet in solar system?', answer: 'Jupiter', difficulty: 'medium' },
        { question: 'What is the speed of light?', answer: '3,00,000 m/s', difficulty: 'hard' },
        { question: 'Mass of proton?', answer: '1.6*10^-27 kg', difficulty: 'hard' },
      ],
     
      math: [
        {question: '8+13=',answer:'21',difficulty:'easy'},
        {question: '2+7=',answer:'9',difficulty:'easy'},
        {question: 'X+4=9, Find x?',answer:'5',difficulty:'medium'},
        {question: '2x-y=5, x+y=4 then (x,y)=?',answer:'3,1',difficulty:'hard'},
        {question: 'Square root of 144?',answer:'12',difficulty:'medium'},
        {question: 'what is derrivative of 9x-123?',answer:'9',difficulty:'hard'},
      ],
      history: [
        {question: 'What is the birth datr of ch. shivaji Maharaj?',answer:'19 Feb 1630 ',difficulty:'easy'},
        {question: 'Who was the son of Akbar?',answer:'Jahangir',difficulty:'medium'},
        {question: 'Mahabharat written by ...?',answer:'Vyas Muni',difficulty:'medium'},
        {question: 'Atharvaveda was compiled in which century?',answer:'1100 BCE',difficulty:'hard'},
      ]
    };
  
    const quizContainer = document.getElementById('quiz-container');
    const progressBar = document.getElementById('progress');
    let currentCategory = 'science'; 
    let currentDifficulty = 'easy'; 
    let questions = [];
    let answeredQuestions = 0;
  
    function loadQuestions() {
      questions = categories[currentCategory].filter(q => q.difficulty === currentDifficulty);
      shuffleArray(questions);
      displayQuestion();
    }
  
    function displayQuestion() {
      quizContainer.innerHTML = '';
      if (questions.length === 0) {
        quizContainer.innerHTML = '<p>No questions available.</p>';
        return;
      }
  
      const question = questions.pop();
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `
        <p>${question.question}</p>
        <input type="text" id="answer-input">
        <button id="submit-answer">Submit</button>
        <p id="timer">Timer: <span id="time-elapsed">0</span>s</p>
      `;
      quizContainer.appendChild(questionElement);
  
      let timer = 0;
      const timerInterval = setInterval(() => {
        timer++;
        document.getElementById('time-elapsed').textContent = timer;
      }, 1000);
  
      document.getElementById('submit-answer').addEventListener('click', () => {
        clearInterval(timerInterval);
        const answerInput = document.getElementById('answer-input').value;
        if (answerInput.toLowerCase() === question.answer.toLowerCase()) {
          questionElement.style.backgroundColor = 'lightgreen';
        } else {
          questionElement.style.backgroundColor = 'lightcoral';
        }
        answeredQuestions++;
        updateProgressBar();
      });
    }
  
    function updateProgressBar() {
      const totalQuestions = categories[currentCategory].length;
      const progressPercentage = (answeredQuestions / totalQuestions) * 100;
      progressBar.style.width = {progressPercentage};
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        currentDifficulty = button.getAttribute('data-difficulty');
        loadQuestions();
      });
    });
  
    document.getElementById('category-dropdown').addEventListener('change', (e) => {
      currentCategory = e.target.value;
      loadQuestions();
    });
  
    loadQuestions();
  });

  