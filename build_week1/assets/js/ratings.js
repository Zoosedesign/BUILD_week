let stars2 = document.querySelectorAll('.star img');
let btnFinale = document.getElementById('btnFinale');
let commento = document.getElementById('testo');
const grazie = document.querySelector('main');

window.addEventListener('load', function () {
  commento.value = ''; //commento è il testo inserito nell'input
  sessionStorage.clear(); //svuotiamo la memorizzazione delle stellina nel caso di eventuale ricaricamento pagina
});

stars2.forEach((item, index1) => {
  item.addEventListener('click', () => {
    stars2.forEach((star2, index2) => {
      //abbiamo invertito l'ordine dell'indice dato che in css abbiamo fatto il "flow-reverse" degli elemnti in <figure>
      index1 <= index2 ? star2.classList.add('active') : star2.classList.remove('active');
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

  commento.value = '';
  stars2.forEach((star2) => {
    star2.classList.remove('active');
  });
});