async function fetchSongs() {
  try {
    const id = new URLSearchParams(window.location.search).get("albumid");
    console.log(id);
    const response = await axios.get(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
    );
    const img = new Image(); // crea un nuovo oggetto immagine
    img.crossOrigin = "anonymous"; // devo cambiare il cross-origin perchè sennò non mi fa accedere all'immagine
    img.src = response.data.cover_xl; // piglia l'immagine
    img.onload = async () => {
      // img.onload fa partire la funzione asincrona quando l'immagine ha finito di caricarsi
      let imgTensor = tf.browser.fromPixels(img); // converte l'immagine in un insieme estremamente grosso di array  che corrispondono a ciascun pixel, come se fosse una specie di tabella

      console.log(imgTensor); // se guardate il console.log ha una size di 270000, sono 300 array in larghezza, 300 in altezza tutti composti da 3 valori, ossia gli RGB (300*300*3 fa appunto 270000)

      const img_trasformata = imgTensor.reshape([-1, imgTensor.shape[2]]); //ridimensiona gli array in modo da creare 9000 array (ognuno composto da 3 valori r, g, b quindi sempre 270000)
      console.log(img_trasformata); //sta cosa serve a fare in modo che l'array non sia più "a forma di tabella" ma sia lineare

      const pixels = img_trasformata.arraySync(); //l'array di colori ritorna sincrono in modo che sia immediatamente eseguibile (come un semplice array qualunque di JS)

      const counter = {}; //semplice contatore dichiarato, ovviamente al momento è vuoto

      for (const pixel of pixels) {
        // Convertiamo il tutto con una stringa con un ciclo for of
        const i = pixel.join(","); // Li separiamo tutti con una virgola

        // Ignora i pixel troppo chiari o scuri
        let rgbValues = i.split(",").map(Number);
        if (
          rgbValues.every((val) => val > 150) || // Se tutti i valori RGB sono > 150, il colore è troppo chiaro
          rgbValues.every((val) => val < 100) // Se tutti i valori RGB sono < 100, il colore è troppo scuro
        ) {
          continue; // Ignora questo pixel e passa al successivo
        }
        counter[i] = (counter[i] || 0) + 1; // Il "or 0" serve a fare in modo che il contatore parta da 1 nel caso in cui siamo al primo ciclo e (quindi quando il contatore sta ancora a 0)
      }

      let pixel_piu_comune; // semplice variabile dichiarata
      let x = 0; //contatore dichiarato

      for (const [chiave_pixel, valore_contatore_pixel] of Object.entries(
        counter
      )) {
        //questo è un altro ciclo for of in cui andiamo a vedere qual'è il pixel che si ripete più volte
        //(.entries serve a destrutturare l'array, dandogli chiave e valore (sennò mancherebbe la chiave))
        if (valore_contatore_pixel > x) {
          //ogni volta che un pixel è presente N volte il contatore diventa pari ad N, quindi se il successivo pixel sarà ripetuto più volte del precedente diventerà il nuovo "primo pixel"
          pixel_piu_comune = chiave_pixel;
          x = valore_contatore_pixel;
        }
      }

      let rgb = pixel_piu_comune.split(","); // Dividiamo la stringa in un array di valori RGB
      let rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`; // Creiamo una stringa RGB per l'uso nel CSS
      console.log(rgbStr);

      document.getElementById(
        "cover"
      ).style.backgroundImage = `linear-gradient(${rgbStr}, #212529 500px, #212529)`; // Impostiamo il colore di sfondo dell'elemento con id 'cover'

      console.log(`Colore più comune: ${pixel_piu_comune}`);
      console.log(`Ripetizioni: ${x}`); //sto console log non serve, è giusto per mostrare quante volte viene ripetuto il pixel più comune
    };

    console.log(response.data);
    document.getElementById("album").innerHTML = `<img
    src="${response.data.cover_xl}"
    class="rounded shadow me-3"
    alt="album cover"
    width="200px"
    height="200px"
  />`;

    const sd = response.data.tracks.data;
    const totalDuration = sd.reduce(
      (total, song) => total + parseInt(song.duration),
      0
    );
    const totalMinutes = Math.round(totalDuration / 60);
    console.log(totalMinutes);
    document.getElementById("title").innerHTML = `
    <small class="mt-5 fs-9 d-flex me-auto">Album</small>
    <h1 class="fs-1 fw-bolder clamp-2">${response.data.title}</h1>
  <div class="d-flex align-items-center me-auto">
    <img
      src="${response.data.artist.picture}"
      class="rounded-circle me-2 d-none d-sm-block"
      alt="band picture"
      width="30"
      height="30"
    />
    <small>
    ${
      response.data.artist.name
    } <img src="../assets/imgs/svg/dot.svg" alt="dot"> ${response.data.release_date.slice(
      0,
      4
    )} <img src="../assets/imgs/svg/dot.svg" alt="dot"> ${
      response.data.tracks.data.length
    } brani ${totalMinutes} min
    </small>
  </div>`;

    const songs = document.getElementById("songs_fetch");

    const songsHtml = response.data.tracks.data
      .map((song, counter) => {
        // Salva l'URL del brano in un attributo data-

        return `<div data-song-url="${song.preview}" data-img="${
          song.album.cover
        }" data-title="${song.title}" data-artist="${
          song.artist.name}" onclick="songsStart(this)" onmouseover="hoverEffect(this)" onmouseout="hoverEffect(this)" class="popular-row d-flex flex-row align-items-center py-2">
      <p class="ps-3 m-0 me-3">
          <span class="opacity d-block">&nbsp;${counter + 1}&nbsp;</span>
          <i class="bi bi-play-fill opacity d-none"></i>
        </p>
        <div class="flex-grow-1 text-truncate">
        <p class="m-0 flex-grow-1 text-truncate">${song.title}</p>
        <small class="m-0 fs-9 opacity-75">${song.artist.name}</small>
        </div>
        <p class="m-0 d-none d-lg-block fw-lighter ms-4">${song.rank.toLocaleString()}</p>
        <i class="btn text-white p-0 bi bi-heart opacity opacity-0 d-none d-sm-block ms-4"></i>
        <p class="m-0 fw-lighter ms-4 me-4 me-sm-0">${Number(
          song.duration / 60
        ).toFixed(2)}</p>
        <a href="" class="btn text-white p-0 d-none d-sm-block ms-4 pe-3"><i class="bi bi-three-dots"></i></a>
      </div>`;
      })
      .join("");

    songs.innerHTML = songsHtml;
  } catch (error) {
    console.error(error);
  }
}

fetchSongs();

function songsStart(div) {
  // Prendi l'URL del brano dal div cliccato
  let songUrl = div.getAttribute("data-song-url");
  song.src = songUrl;
  console.log(songUrl);

  const artista = document.getElementById("article_artist");
  let artistImg = div.getAttribute("data-img");
  let title = div.getAttribute('data-title');
  let artName = div.getAttribute("data-artist");
  console.log(title);
  artista.innerHTML = `<img src="${artistImg}" alt="songImg" width="50" height="50" id="imgThumb">
      <div class="ms-2">
        <h4 id="title" class="text-white m-0 p-0">${title}</h4>
        
        <small id="artist" class="text-white m-0 p-0">${artName}</small>
      </div>`;

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
