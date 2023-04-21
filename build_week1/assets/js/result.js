// VARIABILI GLOBALI RISULTATI
// risposte corrette
let scoreRight = window.sessionStorage.getItem('score');
// numero risposte
let quizLength = window.sessionStorage.getItem('totQst');
// risposte sbagliate 
let scoreWrong = (quizLength - scoreRight);
// percentuale risposte giuste
let percentRight = ((scoreRight / quizLength) * 100).toFixed(1);
// percentuale risposte sbagliate
let percentWrong = (100 - percentRight).toFixed(1);
// esito del test
function stato() {
    if (percentRight >= 60) {
        return '<h5 class="mt-0 mb-0">Congratulations!<br><strong class="light-blue">You passed the exam</strong></h5><p class="mb-0">We\'ll send you the certificate in few minutes. Check your email (including promotions / spam folder.<p>';
    } else {
        return '<h5 class="mt-0 mb-0">Oh sorry!<br><strong class="pink">You failed the exam</strong></h5><p class="mb-0">The teacher will get in touch with you to understand your mistakes, you will definitely improve in the future.</p>';
    }
}

let status = stato();

// POPOLIAMO IL DIV RISPOSTE CORRETTE
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const correctPercentage = document.createElement('b');
correctPercentage.innerHTML = `${percentRight}%`;
correct.appendChild(correctPercentage);
const correctAnswers = document.createElement('p');
correctAnswers.innerHTML = `${scoreRight}/${quizLength} questions`;
correct.appendChild(correctAnswers);

// POPOLIAMO IL DIV RISPOSTE SBAGLIATE 
const wrongPercentage = document.createElement('b');
wrongPercentage.innerHTML = `${percentWrong}%`;
wrong.appendChild(wrongPercentage);
const wrongAnswers = document.createElement('p');
wrongAnswers.innerHTML = `${scoreWrong}/${quizLength} questions`;
wrong.appendChild(wrongAnswers);

// POPOLIAMO IL DIV ESITO DEL TEST
const round = document.querySelector('.round');
round.innerHTML = status;

// DIAMO LA PERCENTUALE ALLA TORTA
function Color() {
    let strokeColor = document.getElementById('circle4').setAttribute('stroke-dasharray', `${percentRight / 100}, 100`);
    return strokeColor;
}
Color()

let btnResults = document.getElementById('btnResults');
btnResults.addEventListener('click', function () {
    location.href = 'rating.html';
})