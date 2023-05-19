//-------- CARD FETCH -----------
const popularBox = document.getElementById("popular");
const row = document.getElementById("row");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const row4 = document.getElementById("row4");

//const id = new URLSearchParams(window.location.search).get("artistid");
const id = new URLSearchParams(window.location.search).get("artistid");
const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`;

fetch(url)
  .then((response) => response.json())

  .then((artists) => {
    console.log(artists.data);
    const artist = artists.data;
    

    const sfondoArtist = document.getElementById("cover2");
    sfondoArtist.style.backgroundImage = `url(${artist[0].contributors[0].picture_xl})`;

    const nomeArtist = document.getElementById("nome_artista")
    nomeArtist.innerHTML = `${artist[0].artist.name}`

    const powerUP = document.getElementById("selezioni_artista")
    powerUP.innerHTML = `<h4>Selezione dell'artista</h4>
    <article class="ps-3">
      <div class="d-flex flex-row align-items-center mt-4">
        <img height="30px" width="30px" class="rounded-circle"
          src="${artist[1].album.cover_small}">
        <small class="fw-lighter ps-2">Creato da ${artist[0].artist.name}</small>
      </div>
      <p class="mb-0 mt-1 fw-semibold">POWER UP - ${artist[0].artist.name}</p>
      <small class="fw-lighter">Album</small>
    </article>

    <article class="ps-3">
      <div class="d-flex flex-row align-items-center mt-4">
        <img height="30px" width="30px" class="rounded-circle"
          src="${artist[2].album.cover_small}">
        <small class="fw-lighter ps-2">Creato da ${artist[0].artist.name}</small>
      </div>
      <p class="mb-0 mt-1 fw-semibold">CHILL - ${artist[0].artist.name}</p>
      <small class="fw-lighter">Album</small>
    </article>`



    for (let i = 0; i < artist.length; i++) {
      //-------- SCHELETRO CARD -----------
      //scheletro
      const popular = `<div data-song-url="${artist[i].preview}" data-img="${artist[i].album.cover}" data-title="${artist[i].title}" data-artist="${artist[i].artist.name}" onclick="songsStart(this)" onmouseover="hoverEffect(this)" onmouseout="hoverEffect(this)" class="popular-row d-flex flex-row align-items-center py-2">
          <p class="ps-2 ps-sm-3 m-0">
            <span class="opacity d-block">&nbsp;${i + 1}&nbsp;</span>
            <i class="bi bi-play-fill opacity d-none"></i>
          </p>            
          <img class="ms-3 me-4" height="40px" width="40px" src="${artist[i].album.cover_small
        }">
          <p class="m-0 flex-grow-1 text-truncate">${artist[i].title}</p>
          <p class="m-0 d-none d-lg-block fw-lighter ms-4">${artist[i].rank}</p>
          <i class="btn text-white p-0 bi bi-heart opacity opacity-0 d-none d-sm-block ms-4"></i>
          <p class="m-0 fw-lighter ms-4 pe-2 pe-sm-0">${Number(
          artist[i].duration / 60
        ).toFixed(2)}</p>
          <a href="" class="btn text-white p-0 d-none d-sm-block ms-4 pe-3"><i class="bi bi-three-dots"></i></a>
        </div>`;

      //scheletro row con copertina quadrata
      const cardSquare = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl d-flex justify-content-center">
      <a href="./album.html?albumid=${artist[i].album.id}" class="text-decoration-none">
        <div class="card cardArticle bg-darklight">
        <div class="m-3 position-relative">
          <img src="${artist[i].album.cover_xl}" class="card-img-top rounded-3 shadow" alt="...">
          <button type="button" class="btn bg-lime position-absolute text-dark rounded-circle">
          <svg width="30" height="42" fill="currentColor" viewBox="0 0 14 16">
            <path
            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg></button>
          </div>
          <article class="card-body text-white pb-5">
            <h6 class="card-title text-truncate fw-bold">${artist[i].title_short}</h6>
            <small class="card-text clamp-1">${artist[i].title}</small>
          </article>
          </a>
        </div>`;

      //scheletro row con copertina rotonda
      const cardCircle = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl d-flex justify-content-center">
      <a href="./album.html?albumid=${artist[i].album.id}" class="text-decoration-none">
        <div class="card cardArticle bg-darklight">
          <div class="m-3">
          <img src="${artist[i].album.cover_xl}" class="card-img-top rounded-circle shadow" alt="...">
          </div>
        <article class="card-body text-white pb-5">
          <h6 class="card-title text-truncate fw-bold">${artist[i].title}</h6>
          <small class="card-text clamp-1">${artist[i].title}</small>
        </article>
        <a>
        </div>`;
      //-------- CREAZIONE CARD -----------
      //creo le card in base al contenuto che voglio
      if (i < 5) {
        popularBox.innerHTML += popular;
      }
      if (i < 5) {
        row.innerHTML += cardSquare;
      }
      if (i < 5) {
        row2.innerHTML += cardCircle;
      }
      if (i < 5) {
        row3.innerHTML += cardSquare;
      }
      if (i < 5) {
        row4.innerHTML += cardSquare;
      }
    }
    // ----------- RESPONSIVE CARD ---------------

    const rows = document.querySelectorAll(".row-cols-xxl-5");
    rows.forEach((row) => {
      // Seleziona l'ultima card
      const lastCard = row.querySelector(".col-12:last-child");
      lastCard.classList.add("d-none", "d-xxl-block");
      // Seleziona la penultima card
      const lastCard2 = row.querySelector(".col-12:nth-last-child(2)");
      lastCard2.classList.add("d-none", "d-lg-block");
      // Seleziona la terzultima card
      const lastCard3 = row.querySelector(".col-12:nth-last-child(3)");
      lastCard3.classList.add("d-none", "d-md-block");
    });
  })
  .catch((error) =>
    console.error("Erorre durante il recupero degli oggetti: ", error)
  );

//------------------ PLAYER ---------------------------

function songsStart(div) {
  // Prendi l'URL del brano dal div cliccato
  let songUrl = div.getAttribute('data-song-url');
  song.src = songUrl;
  console.log(songUrl);
  
  const artista = document.getElementById("article_artist")
  let artistImg = div.getAttribute("data-img")
  let title = div.getAttribute("data-title")
  let artName = div.getAttribute("data-artist")

  artista.innerHTML = `<img src="${artistImg}" alt="songImg" width="50" height="50" id="imgThumb">
      <div class="ms-2">
        <h4 id="title" class="text-white m-0 p-0">${title}</h4>
        
        <small id="artist" class="text-white m-0 p-0">${artName}</small>
      </div>`

      
      song.play();
      playPause();
}


let volume_slider = document.getElementById("volume");
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let btnControl = document.getElementById("btnControl");
let btnsongChosen = document.getElementById("songChosen");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (btnControl.classList.contains("bi-pause-fill")) {
    song.pause();
    btnControl.classList.remove("bi-pause-fill"); //cambio l'icona di pausa con quella di play
    btnControl.classList.add("bi-play-fill");
  } else {
    song.play();
    btnControl.classList.remove("bi-play-fill"); //cambio l'icona di play con quella di pausa
    btnControl.classList.add("bi-pause-fill");
    
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = function () {
  //per fare in modo che su qualsiasi parte della barra io clicchi venga riprodotta la canzone
  song.play();
  song.currentTime = progress.value;
  btnControl.classList.add("bi-pause-fill");
  btnControl.classList.remove("bi-play-fill");
};

function setVolume() {
  btnsongChosen.volume = volume_slider.value / 100;
}