const quiz = {
  survey: [
    {
      question: 'How can I create a <br><b>checkbox in HTML?<b>',
      option: [
        '&lt;input type = "check">', //opzione in alto a sinistra
        '&lt;input type = "checkbox">', //opzione in alto a destra
        '&lt;checkbox>', //opzione in basso a sinistra
        '&lt;input type = "button">' //opzione in basso a destra
      ],
      // "3" è uguale all'indice della risposta esatta nell'array "o" cioè opzioni di risposta.
      answer: 2 //uguale indice terza risposta
    },
    {
      question: 'What does <b>CPU</b> stand for?',
      option: [
        'Central Process Unit',
        'Computer Personal Unit',
        'Central Processor Unit',
        'Central Processing Unit'
      ],
      answer: 3
    },
    {
      question: 'In Java, which of these keywords <b>would you put on a variable</b> to make sure it doesn&#039;t get modified?',
      option: [
        'Static',
        'Final',
        'Private',
        'Public'
      ],
      answer: 1
    },
    {
      question: 'The <b>Snapchat logo</b> is a Bell.',
      option: [
        'False',
        'True'
      ],
      answer: 0
    },
    {
      question: 'Pointers were <b>not used</b> in the original C programming language; they were <b>added later on in C++</b>.',
      option: [
        'False',
        'True'
      ],
      answer: 0
    },
    {
      question: 'What\'s the <b>most preferred image</b> format used for logos in the <b>Wikimedia</b> database?',
      option: [
        '.png',
        '.jpg',
        '.gif',
        '.svg'
      ],
      answer: 3
    },
    {
      question: 'In <b>web design</b>, what does CSS stand for?',
      option: [
        'Counter Strike: Source',
        'Cascading Style Sheet',
        'Corrective Style Sheet',
        'Computer Style Sheet'
      ],
      answer: 1
    },
    {
      question: 'What\'s the code name for the <b>mobile operating system</b> Android 7.0?',
      option: [
        'Marshmallow',
        'Jelly Bean',
        'Nougat',
        'Ice Sandwich'
      ],
      answer: 2
    },
    {
      question: 'On Twitter, what\'s the <b>character limit</b> for a Tweet?',
      option: [
        '90',
        '210',
        '140',
        '65'
      ],
      answer: 2
    },
    {
      question: 'Linux was <b>first created</b> as an <b>alternative</b> to Windows XP.',
      option: [
        'True',
        'False'
      ],
      answer: 1
    },
    {
      question: 'Which programming language <b>shares its name</b> with an Indonesia island?',
      option: [
        'Jakarta',
        'Python',
        'C++',
        'Java'
      ],
      answer: 3
    },
  ],

  // # DICHIARAZIONI VARIABILI BLOBALI/PROPRIETA OGGETTO DEL QUIZ

  // i wrapper/container dei vari contenuti li dichiariamo "null" cioè vuoti, perchè andremo a dargli i contenuti in seguito

  quizContainer: null, // contenitore generale del quiz
  wrapQn: null, // wrapper per la domanda del quiz
  wrapAns: null, // wrapper per le risposte del quiz
  now: 0, // indice della domanda corrente
  score: 0, // punteggio dell'utente
  timeLeft: 30,
  timer: document.getElementById('timeLeft'),

  //p.s. essendo quizContainer, wrapQn, etc proprietà dell'oggetto quiz assegnamo il relativo valore iniziale con ":" al posto di "="

  // # FUNZIONE DI INIZIALIZZAZIONE DEL QUIZ
  init: () => {
    // Recupero del contenitore del quiz dal documento HTML
    quiz.quizContainer = document.getElementById('quizWrap');

    // Creazione del wrapper/contenitore per la domanda
    quiz.wrapQn = document.createElement('p');
    quiz.wrapQn.id = 'quizQn';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapQn);

    // Creazione del wrapper/contenitore per la risposta
    quiz.wrapAns = document.createElement('div');
    quiz.wrapAns.id = 'quizAns';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapAns);

    //eseguiamo la creazione della legenda
    quiz.legenda();

    //chiamata alla funzione che "mescola" le domande
    quiz.survey = quiz.shuffle(quiz.survey);

    // inizializziamo il timer
    quiz.runTimer(document.querySelector('.timer'));

    //eseguiamo il quiz
    quiz.runQuiz();
  },

  // # FUNZIONE DI ESECUZIONE DEL QUIZ
  runQuiz: () => {
    // Inseriamo la domanda corrente, .now potrebbe essere anche .pippo, è il nome che diamo alla proprietà che rappresenta la domanda corrente
    quiz.wrapQn.innerHTML = quiz.survey[quiz.now].question;

    // Svuota il wrapper delle risposte
    quiz.wrapAns.innerHTML = '';

    // Cicla attraverso le opzioni di risposta della domanda corrente
    for (let i in quiz.survey[quiz.now].option) {
      // Crea un input di tipo radio per la risposta
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      // per differenziarli non sapendo il numero delle domande, al nome dell'id verrà aggiunto il numero di indice
      radio.id = 'quiz-option' + i;

      // Aggiunge l'input al wrapper delle risposte
      quiz.wrapAns.appendChild(radio);

      // Crea un label per la risposta e lo imposta con il testo dell'opzione di risposta corrente
      let label = document.createElement('label');
      label.innerHTML = quiz.survey[quiz.now].option[i];

      // Imposta l'attributo "for" del label in modo che corrisponda all'id dell'input di risposta
      label.setAttribute('for', 'quiz-option' + i);

      // ".index" memorizzerà il numero di indice corrispondente alla risposta scelta dall'utente, cioè il dato che ci serve (.dataset).
      label.dataset.index = i;

      // Aggiungiamo al label un event listener per intercettare la selezione dell'opzione di risposta
      label.addEventListener('click', () => quiz.select(label));

      // Aggiunge il label al wrapper delle risposte
      quiz.wrapAns.appendChild(label);
    }
  },

  // # FUNZIONE AGGIORNAMENTO CONTATORE
  counterUpdate: () => {
    const contatoreParagrafo = document.querySelector("#contatore");
    contatoreParagrafo.textContent = quiz.now + 1;
  },

  // # FUNZIONE CREAZIONE LEGENDA CON CONTATORE DOMANDE
  legenda: () => {
    const legend = document.createElement('p');
    legend.setAttribute('id', 'legend');
    legend.style.cssText = 'position:absolute;bottom:50px;right:calc(50%-150px);width:300px;height:50px';
    legend.innerHTML = `QUESTION <span id="contatore">${quiz.now + 1}</span> <b style="color:#900080;">/ ${quiz.survey.length}</b>`
    document.body.appendChild(legend);
  },

  // # DOMANDE RANDOM
  shuffle: (array) => array.sort(() => Math.random() - 0.5),

  // # COUNTDOWN
  isTimeLeft: () => {
    return quiz.timeLeft > -1;
  },
  
  // # TIMER
  runTimer: (timerElement) => {
    const timerCircle = timerElement.querySelector('svg > circle + circle');
    timerCircle.style.strokeDashoffset = 1;
  
    let countdownTimer = setInterval(function () {
      if (quiz.isTimeLeft()) {
        // Calcolare il tempo rimanente e normalizzarlo su una scala da 0 a 1
        const timeRemaining = quiz.timeLeft--;
        const normalizedTime = (30 + timeRemaining) / 30;
        timerCircle.style.strokeDashoffset = normalizedTime; // Impostare il nuovo valore dell'attributo "strokeDashoffset"
        quiz.timer.innerHTML = timeRemaining;  // Aggiornare il valore del tempo rimanente nella pagina
      } else {
        // Se non c'è più tempo disponibile, eseguire la funzione "timeOut" e incrementare la proprietà "quiz.now"
        quiz.now++;
        quiz.timeOut();
      }
    }, 1000);
  },
  
  select: (option) => {
    // Remove the 'click' event listener from all answer label to prevent the user from selecting more than one answer
    let all = quiz.wrapAns.getElementsByTagName('label');
    for (let label of all) {
      label.removeEventListener('click', quiz.select);
    }
  
    // Check if the index of the selected option is equal to that stored in the answer property of the relevant question
    let correct = option.dataset.index == quiz.survey[quiz.now].answer;
  
    // Update the user's score and the appearance of the selected answer option
    if (correct) {
      quiz.score++;
      option.classList.add('selected');
    } else { 
      option.classList.add('selected'); 
    }
  
    quiz.now++;
    quiz.timeOut();
  },
  
  // Reset property, in case we want to try the quiz again by adding a button
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.runQuiz();
  },
  
  // Reset the timer to the initial value
  resetTimer: () => {
    quiz.timeLeft = 30;
  },
  
  // #TIMEOUT FUNCTION TO RE-INITIALIZE THE QUIZ AFTER THE ANSWER CLICK OR TIMER EXPIRATION
  timeOut: () => {
    setTimeout(function () {
      // if the index of the quiz just answered is less than the length of the "survey:" property of the quiz, run the quiz again.
      if (quiz.now < quiz.survey.length) {
        // reset timer and re-initialization of counter, timer, questions.
        quiz.counterUpdate();
        quiz.resetTimer();
        quiz.runQuiz();
        quiz.runTimer();
      } else { //otherwise, give the results
        window.sessionStorage.setItem('score', quiz.score);
        window.sessionStorage.setItem('totQst', quiz.survey.length)
        location.href = 'results.html';
      }
    }, 500)
  },
  }
  window.addEventListener('load', quiz.init);