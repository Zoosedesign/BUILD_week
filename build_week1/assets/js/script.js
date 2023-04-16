//https://code-boxx.com/simple-javascript-quiz/#sec-extra

var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  data: [
  {
    q : 'What is the standard distance between the target and archer in Olympics?',
    o : [
      '50 meters',
      '70 meters',
      '100 meters',
      '120 meters'
    ],
    a : 1 // "1" è uguale all'indice della risposta esatta nell'array "o" cioè opzioni.
  },
  {
    q : 'Which is the highest number on a standard roulette wheel?',
    o : [
      '22',
      '24',
      '32',
      '36'
    ],
    a : 3
  },
  {
    q : 'How much wood could a woodchuck chuck if a woodchuck would chuck wood?',
    o : [
      '400 pounds',
      '550 pounds',
      '700 pounds',
      '750 pounds'
    ],
    a : 2
  },
  {
    q : 'Which is the seventh planet from the sun?',
    o : [
      'Uranus',
      'Earth',
      'Pluto',
      'Mars'
    ],
    a : 0
  },
  {
    q : 'Which is the largest ocean on Earth?',
    o : [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean'
    ],
    a : 3
  }
  ],

  // (A2) HTML ELEMENTS
  quizContainer: null, // HTML quiz container
  wrapQn: null, // HTML question wrapper
  wrapAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT HTML QUIZ
  init: () => {
    // (B1) WRAPPER
    quiz.quizContainer = document.getElementById('quizWrap');

    // (B2) QUESTIONS SECTION
    quiz.wrapQn = document.createElement('div');
    quiz.wrapQn.id = 'quizQn';
    quiz.quizContainer.appendChild(quiz.wrapQn);

    // (B3) ANSWERS SECTION
    quiz.wrapAns = document.createElement('div');
    quiz.wrapAns.id = 'quizAns';
    quiz.quizContainer.appendChild(quiz.wrapAns);

    // (B4) GO!
    quiz.runQuiz();
  },

  // (C) runQuiz QUESTION
  runQuiz: () => {
    // (C1) QUESTION
    quiz.wrapQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.wrapAns.innerHTML = '';
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.id = 'quizo' + i;
      quiz.wrapAns.appendChild(radio);
      let label = document.createElement('label');
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute('for', 'quizo' + i);
      label.dataset.idx = i;
      label.addEventListener('click', () => quiz.select(label));
      quiz.wrapAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.wrapAns.getElementsByTagName('label');
    for (let label of all) {
      label.removeEventListener('click', quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add('correct');
    } else {
      option.classList.add('wrong');
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.runQuiz(); }
      else {
        quiz.wrapQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.wrapAns.innerHTML = '';
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.runQuiz();
  }
};
window.addEventListener('load', quiz.init);