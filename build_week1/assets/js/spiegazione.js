var quiz = {
  data: [
    {
      q: 'What is the standard distance between the target and archer in Olympics?',
      o: [
        '50 meters',
        '70 meters',
        '100 meters',
        '120 meters'
      ],
      // "1" è uguale all'indice della risposta esatta nell'array "o" cioè opzioni di risposta.
      a: 1
    },
    {
      q: 'Which is the highest number on a standard roulette wheel?',
      o: [
        '22',
        '24',
        '32',
        '36'
      ],
      a: 3
    },
    {
      q: 'How much wood could a woodchuck chuck if a woodchuck would chuck wood?',
      o: [
        '400 pounds',
        '550 pounds',
        '700 pounds',
        '750 pounds'
      ],
      a: 2
    },
    {
      q: 'Which is the seventh planet from the sun?',
      o: [
        'Uranus',
        'Earth',
        'Pluto',
        'Mars'
      ],
      a: 0
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Arctic Ocean',
        'Pacific Ocean'
      ],
      a: 3
    }
  ],

  // # DICHIARAZIONI VARIABILI BLOBALI DEL QUIZ

  // i wrapper/container dei vari contenuti li dichiariamo "null" cioè vuoti, perchè andremo a dargli i contenuti in seguito

  quizContainer: null, // contenitore generale del quiz
  wrapQn: null, // wrapper per la domanda del quiz
  wrapAns: null, // wrapper per le risposte del quiz
  now: 0, // indice della domanda corrente
  score: 0, // punteggio dell'utente

  //p.s. essendo quizContainer, wrapQn, etc proprietà dell'oggetto quiz assegnamo il relativo valore iniziale con ":" al posto di "="

  // # FUNZIONE DI INIZIALIZZAZIONE DEL QUIZ
  init: () => {
    // Recupero del contenitore del quiz dal documento HTML
    quiz.quizContainer = document.getElementById('quizWrap');

    // Creazione del wrapper/contenitore per la domanda
    quiz.wrapQn = document.createElement('div');
    quiz.wrapQn.id = 'quizQn';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapQn);

    // Creazione del wrapper/contenitore per la risposta
    quiz.wrapAns = document.createElement('div');
    quiz.wrapAns.id = 'quizAns';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapAns);
    
    //eseguiamo il quiz
    quiz.runQuiz();
  },

  // # FUNZIONE DI ESECUZIONE DEL QUIZ
  runQuiz: () => {
    // Inseriamo la domanda corrente, .now potrebbe essere anche .pippo, è il nome che diamo alla proprietà che rappresenta la domanda corrente
    quiz.wrapQn.innerHTML = quiz.data[quiz.now].q;

    // Svuota il wrapper delle risposte
    quiz.wrapAns.innerHTML = '';

    // Cicla attraverso le opzioni di risposta della domanda corrente
    for (let i in quiz.data[quiz.now].o) {
      // Crea un input di tipo radio per la risposta
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.id = 'quizOption' + i;

      // Aggiunge l'input al wrapper delle risposte
      quiz.wrapAns.appendChild(radio);

      // Crea un label per la risposta e lo imposta con il testo dell'opzione di risposta corrente
      let label = document.createElement('label');
      label.innerHTML = quiz.data[quiz.now].o[i];

      // Imposta l'attributo "for" del label in modo che corrisponda all'id dell'input di risposta
      label.setAttribute('for', 'quizOption' + i);

      // Imposta l'attributo "data-idx" del label con l'indice dell'opzione di risposta corrente
      label.dataset.idx = i;

      // Aggiunge un event listener al label per gestire la selezione dell'opzione di risposta
      label.addEventListener('click', () => quiz.select(label));

      // Aggiunge il label al wrapper delle risposte
      quiz.wrapAns.appendChild(label);
    }
  },

  select: (option) => {
    let all = quiz.wrapAns.getElementsByTagName('label');
    for (let label of all) {
      label.removeEventListener('click', quiz.select);
    }

    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add('correct');
    } else {
      option.classList.add('wrong');
    }

    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.runQuiz(); }
      else {
        quiz.wrapQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.wrapAns.innerHTML = '';
      }
    }, 1000);
  },

  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.runQuiz();
  }
};
window.addEventListener('load', quiz.init);