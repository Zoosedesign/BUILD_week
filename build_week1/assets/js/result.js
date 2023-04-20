window.addEventListener('load', function() {

})
var scoreRight = localStorage.getItem('score');
console.log(scoreRight);
var quizLength = localStorage.getItem('totQst')
console.log(quizLength);
var scoreWrong = (quizLength-scoreRight);
console.log(scoreWrong);
var percentRight = ((scoreRight/quizLength) * 100.).toFixed(1);
console.log(percentRight);
var percentWrong = (100-percentRight).toFixed(1);
console.log(percentWrong);
function stato() {
    if(percentRight >= 60){
       return '<h5>Congratulations!<br><strong class="light-blue">You passed the exam.</strong></h5><p>We\'ll send you the certificate in few minutes.Check your email (including promotions / spam folder<p>';
    } else {
        return '<h5>Oh sorry!<br><strong class="light-blue">You failed the exam.</strong></h5><p>The teacher will get in touch with you to understand your mistakes, you will definitely improve in the future</p>';
    }
} 
var status = stato();

const correct = document.getElementsByClassName('correct')[0];
const wrong = document.getElementsByClassName('wrong')[0];
const correctPercentage = document.createElement('p');
correctPercentage.innerHTML = `${percentRight}%`;
correct.appendChild(correctPercentage);
const correctAnswers = document.createElement('p');
correctAnswers.innerHTML =`<span id="contatore">${scoreRight}</span>/${quizLength}questions`;
correct.appendChild(correctAnswers);
//div frasi fasi sbagliate 
const wrongPercentage = document.createElement('p');
wrongPercentage.innerHTML = `${percentWrong}%`;
wrong.appendChild(wrongPercentage);
const wrongAnswers = document.createElement('p');
wrongAnswers.innerHTML = `<span id="contatore">${scoreWrong}</span>/${quizLength}questions`;
wrong.appendChild(wrongAnswers);
//commento separatore


const round = document.getElementsByClassName('round')[0];
round.innerHTML = status;


function Color(){
    var strokeColor = document.getElementById('circle4').setAttribute('stroke-dasharray', `${percentRight/100}, 100`);
   return strokeColor;
}
Color()

var btnResults=document.getElementById('btnResults');
btnResults.addEventListener('click',function(){
    location.href = 'rating.html';
})

/*correctPercentage.innerHTML = 
const percentualeCorretta=document.getElementsByClassName('percentuale');
const risposteCorrette=document.getElementsByClassName('risposteCorrette');
percentualeCorretta.innerHTML="quizLength/score%";
risposteCorrette.innerHTML = `<span id="contatore">${score}</span> <b style="color:#900080;">/ ${quizLength}</b>`
*/
