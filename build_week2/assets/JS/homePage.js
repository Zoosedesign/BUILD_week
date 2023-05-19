var row = document.getElementById('row');
var row2 = document.getElementById('row2');
var row3 = document.getElementById('row3');
var row4 = document.getElementById('row4');

//row le ultime nuove uscite//

const url_row = "https://striveschool-api.herokuapp.com/api/deezer/search?q=rap";

fetch(url_row)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (let j = 0; j < 5; j++) {
      const card = `<a href="./album.html?albumid=${data.data[j].album.id}" class="rounded-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xxl border border-0 mb-4 text-decoration-none">
      <div class="card cardHome rounded-3 border border-0">
          <div class="m-3 mb-0">
          <img src="${data.data[j].album.cover_xl}" class="card-img-top" alt="albumCover">
          <button type="button" class="btn bg-lime position-absolute text-dark rounded-circle" id="${data.data[j].id}">
          <svg width="30" height="42" fill="currentColor" viewBox="0 0 14 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </button>
      </div>
          <div class="card-body p-3">
              <h2 class="text-white card-title fs-4 fw-bold clamp-1">${data.data[j].title}</h2>
              <p class="card-text text-white clamp-1">${data.data[j].artist.name}</p>
          </div>
      </div>
  </a>`

      row.innerHTML += card;
    }
    // ----------- RESPONSIVE CARD ---------------

    // Seleziona l'ultima card
    const lastCard = row.querySelector('.col-12:last-child');
    lastCard.classList.add('d-none', 'd-xxl-block');
    // Seleziona la penultima card
    const lastCard2 = row.querySelector('.col-12:nth-last-child(2)');
    lastCard2.classList.add('d-none', 'd-lg-block');
    // Seleziona la terzultima card
    const lastCard3 = row.querySelector('.col-12:nth-last-child(3)');
    lastCard3.classList.add('d-none', 'd-md-block');
  })
  .catch((error) =>
    console.error("Erorre durante il recupero degli oggetti: ", error)
  );

//nuove star crescono//

const url_row2 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";

fetch(url_row2)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (let j = 0; j < 5; j++) {
      const card = `<a href="./artist.html?artistid=${data.data[j].artist.id}" class="rounded-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xxl border border-0 mb-4 text-decoration-none">
      <div class="card cardHome rounded-3 border border-0">
          <div class="m-3 mb-0">
          <img src="${data.data[j].album.cover_xl}" class="card-img-top" alt="albumCover">
          <button type="button" class="btn bg-lime position-absolute text-dark rounded-circle" id="${data.data[j].id}">
          <svg width="30" height="42" fill="currentColor" viewBox="0 0 14 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </button>
      </div>
          <div class="card-body p-3">
              <h2 class="text-white card-title fs-4 fw-bold clamp-1">${data.data[j].artist.name}</h2>
              <p class="card-text text-white clamp-1">${data.data[j].title}</p>
          </div>
      </div>
  </a>`

      row2.innerHTML += card;
    }
    // ----------- RESPONSIVE CARD ---------------

    // Seleziona l'ultima card
    const lastCard = row2.querySelector('.col-12:last-child');
    lastCard.classList.add('d-none', 'd-xxl-block');
    // Seleziona la penultima card
    const lastCard2 = row2.querySelector('.col-12:nth-last-child(2)');
    lastCard2.classList.add('d-none', 'd-lg-block');
    // Seleziona la terzultima card
    const lastCard3 = row2.querySelector('.col-12:nth-last-child(3)');
    lastCard3.classList.add('d-none', 'd-md-block');
  })
  .catch((error) =>
    console.error("Erorre durante il recupero degli oggetti: ", error)
  );

//row artisti piu popolari//

const url_row3 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=e";

fetch(url_row3)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (let j = 0; j < 5; j++) {
      const card2 = `<a href="./artist.html?artistid=${data.data[j].artist.id}" class="rounded-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xxl border border-0 mb-4 text-decoration-none">
      <div class="card cardHome rounded-3 border border-0">
          <div class="m-3 mb-0">
          <img src="${data.data[j].album.cover_xl}" class="card-img-top" alt="albumCover">
          <button type="button" class="btn bg-lime position-absolute text-dark rounded-circle" id="${data.data[j].id}">
          <svg width="30" height="42" fill="currentColor" viewBox="0 0 14 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </button>
      </div>
          <div class="card-body p-3">
              <h2 class="text-white card-title fs-4 fw-bold clamp-1">${data.data[j].artist.name}</h2>
              <p class="card-text text-white clamp-1">${data.data[j].title}</p>
          </div>
      </div>
  </a>`

      row3.innerHTML += card2;
    }
    // ----------- RESPONSIVE CARD ---------------

    // Seleziona l'ultima card
    const lastCard = row3.querySelector('.col-12:last-child');
    lastCard.classList.add('d-none', 'd-xxl-block');
    // Seleziona la penultima card
    const lastCard2 = row3.querySelector('.col-12:nth-last-child(2)');
    lastCard2.classList.add('d-none', 'd-lg-block');
    // Seleziona la terzultima card
    const lastCard3 = row3.querySelector('.col-12:nth-last-child(3)');
    lastCard3.classList.add('d-none', 'd-md-block');
  })
  .catch((error) =>
    console.error("Erorre durante il recupero degli oggetti: ", error)
  );


//row album piu popolari//

const url_row4 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=abc";

fetch(url_row4)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (let j = 0; j < 5; j++) {
      const card = `<a href="./album.html?albumid=${data.data[j].album.id}" class="rounded-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xxl border border-0 mb-4 text-decoration-none">
      <div class="card cardHome rounded-3 border border-0">
          <div class="m-3 mb-0">
          <img src="${data.data[j].album.cover_xl}" class="card-img-top" alt="albumCover">
          <button type="button" class="btn bg-lime position-absolute text-dark rounded-circle" id="${data.data[j].id}">
          <svg width="30" height="42" fill="currentColor" viewBox="0 0 14 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </button>
      </div>
          <div class="card-body p-3">
              <h2 class="text-white card-title fs-4 fw-bold clamp-1">${data.data[j].title}</h2>
              <p class="card-text text-white clamp-1">${data.data[j].artist.name}</p>
          </div>
      </div>
  </a>`

      row4.innerHTML += card;
    }
    // ----------- RESPONSIVE CARD ---------------

    // Seleziona l'ultima card
    const lastCard = row4.querySelector('.col-12:last-child');
    lastCard.classList.add('d-none', 'd-xxl-block');
    // Seleziona la penultima card
    const lastCard2 = row4.querySelector('.col-12:nth-last-child(2)');
    lastCard2.classList.add('d-none', 'd-lg-block');
    // Seleziona la terzultima card
    const lastCard3 = row4.querySelector('.col-12:nth-last-child(3)');
    lastCard3.classList.add('d-none', 'd-md-block');
  })
  .catch((error) =>
    console.error("Errore durante il recupero degli oggetti: ", error)
  );

