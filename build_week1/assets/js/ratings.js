var stars2 = document.querySelectorAll(".star img");// seleziono tutte le immaginisvg nel div contenitore.
var BtnFinale = document.getElementById('btnFinale');
var vuoto = document.getElementById('testo'); 


window.addEventListener('load', function () {
	vuoto.value = "";
});

//serve il comando per fare in modo che passando sopra una stella questa si attivi assieme alle precdenti.
stars2.forEach((item, index1) => { //seleziono ogni elemento.
  item.addEventListener('mouseover', () => { //selezionare le stelle quando ci si passa sopra
    stars2.forEach((star2, index2) => {
      index1 >= index2 ? star2.classList.add('active') : star2.classList.remove('active')// assegna lo stile active che è la classe presente in CSS che una volta attivata mi fa comparire sl svg originale e mi fa lo zoom in più del 10% del normale;
    })
  } )
})

//ora serve il comando per fare in modo che selezionando una stella questa rimanga attiva assieme alle precdenti.
stars2.forEach((item, index1) => {
    item.addEventListener('click', () => {  //selezionare le stelle quando ci clicchi;
      stars2.forEach((star2, index2) => {
        index1 >= index2 ? star2.classList.add('active') : star2.classList.remove('active'); // stessa cosa di sopra
        let value = Number(item.getAttribute("value"));// questo comando è in più per fare in modo che quando si seleziona una stella il valore della stella venga salvato in console log.
            console.log(value);
      })
    } )
  })

  BtnFinale.addEventListener('click', function () {
    vuoto.value = "";
});