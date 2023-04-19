var quiz = {
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
    legend.style.cssText = 'position:absolute;bottom:50px;right:calc(50%-150px);width:300px;height:50px';
    legend.innerHTML = `QUESTION <span id="contatore">${quiz.now + 1}</span> <b style="color:#900080;">/ ${quiz.survey.length}</b>`
    document.body.appendChild(legend);
  },

  // # DOMANDE RANDOM
  shuffle: (array) => array.sort(() => Math.random() - 0.5),

  select: (option) => {
    // Rimuove l'event listener 'click' da tutte le label delle risposte per evitare che l'utente possa selezionare più di una risposta
    let all = quiz.wrapAns.getElementsByTagName('label');
    for (let label of all) {
      label.removeEventListener('click', quiz.select);
    }

    // Verifica se l'indice dell'opzione selezionata è uguale a quella memorizzata nella proprietà answer della domanda relativa
    let correct = option.dataset.index == quiz.survey[quiz.now].answer;

    // Aggiornamento del punteggio dell'utente e dell'aspetto dell'opzione di risposta selezionata
    if (correct) {
      quiz.score++;
      option.classList.add('selected');
    } else {
      option.classList.add('selected');
    }
    
    quiz.now++;
    setTimeout(() => {
      //se l'indice del quiz appena risposto è minore della lunghezza della proprietà "survey:" del quiz, ri-esegui il quiz.
      if (quiz.now < quiz.survey.length) { 
        // Aggiorno il contatore e cambio domanda
        quiz.counterUpdate();
        quiz.runQuiz(); }
      else { //altrimenti dai i risultati
        quiz.wrapQn.innerHTML = `You have answered ${quiz.score} of ${quiz.survey.length} correctly.`;
        quiz.wrapAns.innerHTML = '';
      }
    }, 500);
  },

  //proprietà reset, qual'ora volessimo riprovarlo aggiungendo un bottone
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.runQuiz();
  }
};

window.addEventListener('load', quiz.init);