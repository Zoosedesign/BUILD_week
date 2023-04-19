var stars2 = document.querySelectorAll(".star img"); // seleziono tutte le immagini svg nel div contenitore.
var BtnFinale = document.getElementById('btnFinale');
var vuoto = document.getElementById('testo');
var selectedStar = -1; // indice della stella selezionata

window.addEventListener('load', function () {
  vuoto.value = "";
});

stars2.forEach((item, index1) => {
  item.addEventListener('mouseover', () => {
    if (selectedStar === -1) { // colora le stelle solo se non c'è alcuna stella selezionata
      stars2.forEach((star2, index2) => {
        index1 >= index2 ? star2.classList.add('active') : star2.classList.remove('active');
      });
    }
  });

  item.addEventListener('mouseleave', () => {
    if (selectedStar === -1) { // torna al colore normale solo se non c'è alcuna stella selezionata
      stars2.forEach((star2) => {
        star2.classList.remove('active');
      });
    }
  });

  item.addEventListener('click', () => {
    if (selectedStar === index1) { // disattiva la stella selezionata se viene cliccata nuovamente
      selectedStar = -1;
      stars2.forEach((star2) => {
        star2.classList.remove('active');
      });
    } else {
      selectedStar = index1; // altrimenti salva l'indice della stella selezionata
      stars2.forEach((star2, index2) => {
        index1 >= index2 ? star2.classList.add('active') : star2.classList.remove('active');
      });
    }
  });
});

BtnFinale.addEventListener('click', function () {
  vuoto.value = "";
  selectedStar = -1; // resetta la stella selezionata
  stars2.forEach((star2) => {
    star2.classList.remove('active');
  });
});