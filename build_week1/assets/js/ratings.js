var stars2 = document.querySelectorAll('.star img');
var btnFinale = document.getElementById('btnFinale');
var vuoto = document.getElementById('testo'); 
const app = document.getElementsByClassName('center')[1];

window.addEventListener('load', function () {
    vuoto.value = '';
});

stars2.forEach((item, index1) => {
    item.addEventListener('click', () => { 
      stars2.forEach((star2, index2) => {
        index1 <= index2 ? star2.classList.add('active') : star2.classList.remove('active');
        let value = Number(item.getAttribute('value-star'));
        sessionStorage.setItem('value-star', value)
            console.log(value);
      })
    } )
  })

btnFinale.addEventListener('click', function () {
  if (vuoto.value == "" || !sessionStorage.getItem('value-star')){
    alert('Write a comment and rate us!')
  } else {
    sessionStorage.setItem('testo', vuoto);
    btnFinale.setAttribute('disabled', 'true');
    vuoto.classList.add('off');
    const grazie = document.createElement('p');
    vuoto.appendChild(grazie);
    app.innerHTML = `<h4 class="pink">Thank you, your reply has been recorded!</h4>`;
  }

  vuoto.value = '';
  stars2.forEach((star2) => {
    star2.classList.remove('active');
  });
});