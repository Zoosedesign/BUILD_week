var stars2 = document.querySelectorAll('.star img');
var BtnFinale = document.getElementById('btnFinale');
var vuoto = document.getElementById('testo'); 

window.addEventListener('load', function () {
    vuoto.value = '';
    stars2.value = '';
});

stars2.forEach((item, index1) => {
    item.addEventListener('click', () => { 
      stars2.forEach((star2, index2) => {
        index1 <= index2 ? star2.classList.add('active') : star2.classList.remove('active');
        let value = parseInt(item.getAttribute('value'));
            console.log(value);
      })
    } )
  })

BtnFinale.addEventListener('click', function () {
  vuoto.value = '';
  stars2.forEach((star2) => {
    star2.classList.remove('active');
  });
});