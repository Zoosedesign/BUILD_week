let arrayStars = document.querySelectorAll('.star img');
let btnFinale = document.getElementById('btnFinale');
let commento = document.getElementById('testo');
const grazie = document.querySelector('main');

window.addEventListener('load', function () {
  commento.value = ''; //commento è il testo inserito nell'input
  sessionStorage.clear(); //svuotiamo la memorizzazione delle stellina nel caso di eventuale ricaricamento pagina
});

arrayStars.forEach((item, index) => {
  item.addEventListener('click', () => {
    arrayStars.forEach((item, selectedIndex) => {
      //abbiamo invertito l'ordine dell'indice dato che in css abbiamo fatto il "flow-reverse" degli elemnti in <figure>
      index <= selectedIndex ? item.classList.add('active') : item.classList.remove('active');
      let value = Number(item.getAttribute('value-star'));
      sessionStorage.setItem('value-star', value); //salviamo il valore della stellina
    })
  })
})

btnFinale.addEventListener('click', function () {
  if (commento.value == "" || !sessionStorage.getItem('value-star')) {
    alert('Write a comment and rate us!')
  } else {
    sessionStorage.setItem('testo', commento);
    grazie.innerHTML = `<h3 class="light-blue">Thank you, your feedback has been recorded!</h3>`;
  }
});