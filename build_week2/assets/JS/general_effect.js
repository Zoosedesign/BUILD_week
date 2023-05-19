//-------- ASIDE ARTEM -----------
document.addEventListener("DOMContentLoaded", function () {
  let hideButton = document.getElementById("hide");
  hideButton.addEventListener("click", function () {
    let aside = document.getElementById("sezioneHide");
    aside.classList.remove("d-xl-block");
  });
});

//-------- FETCH ASIDE OVERFLOW -----------
const urlAside = "https://striveschool-api.herokuapp.com/api/deezer/search?q=a";

fetch(urlAside)
.then(response => response.json())
  .then((data) => {

    for (let j = 0; j < 15; j++) {
      document.querySelector('.overflow-y-auto').innerHTML += `
    <article class="d-flex flex-row align-items-center mt-3">
      <a href=""><img height="52px" width="52px" class="rounded me-2"
      src="${data.data[j].album.cover_medium}"
      alt="album cover"></a>
      <div class="d-none d-lg-flex flex-column">
      <small class="m-0 fw-semibold text-white clamp-1">${data.data[j].title}</small>
      <!--Icona pinna-->
      <a href="#" class="btn d-flex align-items-center p-0" id="playlist">
      <small class="text-white opacity-75 clamp-1">Album <i class="bi bi-dot"></i> ${data.data[j].artist.name}
      </small></a>
      </div>
    </article>
    `};
  })
  .catch((error) => {
    console.log(error);
  })

//-------- BOTTONI AVANTI / INDIETRO -----------
// Torna alla pagina precedente
document.getElementById('pre').addEventListener('click', function (e) {
  e.preventDefault(); // Evita il comportamento predefinito del link
  history.back(); // Torna alla pagina precedente
});

// Torna alla pagina da cui si è tornati indietro
document.getElementById('post').addEventListener('click', function (e) {
  e.preventDefault(); // Evita il comportamento predefinito del link
  history.forward(); // Torna alla pagina da cui si è tornati indietro
});

//-------- SCROLL "HEADER" -----------
var header = document.querySelector("header");
header.style.backgroundColor = "rgba(0,0,0,0)";

window.addEventListener("scroll", function () {
  if (window.scrollY > 8) {
    header.style.backgroundColor = "#343a40";
  } else {
    header.style.backgroundColor = "rgba(0,0,0,0)";
  }
});
//-------- HOVER EFFECT -----------

function hoverEffect(element) {
  let elements = element.querySelectorAll(".opacity");
  elements.forEach((el) => {
    el.classList.toggle("opacity-100");
    el.classList.toggle("d-none");
    el.classList.toggle("d-block");
  });
}
