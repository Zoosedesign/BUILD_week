//-------- POPOLAMENTO CARD HEAD -----------
var image = [{
    img: "../assets/imgs/search/image-1.jpeg",
    title: "Podcast"
},
{
    img: "../assets/imgs/search/image-2.jpg",
    title: "Eventi dal vivo"
},
{
    img: "../assets/imgs/search/image-3.jpg",
    title: "Creata per te"
},
{
    img: "../assets/imgs/search/image-4.jpg",
    title: "Nuove uscite"
},
{
    img: "../assets/imgs/search/image-5.jpg",
    title: "Sanremo"
},
{
    img: "../assets/imgs/search/image-6.jpg",
    title: "Pop"
},
{
    img: "../assets/imgs/search/image-7.jpg",
    title: "Hip Hop"
},
{
    img: "../assets/imgs/search/image-8.jpg",
    title: "Dance"
},
{
    img: "../assets/imgs/search/image-9.jpg",
    title: "Classifiche"
},
{
    img: "../assets/imgs/search/image-10.jpg",
    title: "Latina"
},
{
    img: "../assets/imgs/search/image-11.jpg",
    title: "Rock"
},
{
    img: "../assets/imgs/search/image-12.jpg",
    title: "Mood"
},
{
    img: "../assets/imgs/search/image-13.jpeg",
    title: "scopri"
},
{
    img: "../assets/imgs/search/image-14.jpg",
    title: "Di tendenza"
},
{
    img: "../assets/imgs/search/image-15.jpg",
    title: "Indie"
},
{
    img: "../assets/imgs/search/image-16.jpg",
    title: "Nostalgia"
},
{
    img: "../assets/imgs/search/image-1.jpeg",
    title: "Podcast"
},
{
    img: "../assets/imgs/search/image-2.jpg",
    title: "Eventi dal vivo"
},
{
    img: "../assets/imgs/search/image-3.jpg",
    title: "Creata per te"
},
{
    img: "../assets/imgs/search/image-4.jpg",
    title: "Nuove uscite"
},
{
    img: "../assets/imgs/search/image-5.jpg",
    title: "Sanremo"
},
{
    img: "../assets/imgs/search/image-6.jpg",
    title: "Pop"
},
{
    img: "../assets/imgs/search/image-7.jpg",
    title: "Hip Hop"
},
{
    img: "../assets/imgs/search/image-8.jpg",
    title: "Dance"
},
{
    img: "../assets/imgs/search/image-9.jpg",
    title: "Classifiche"
},
{
    img: "../assets/imgs/search/image-10.jpg",
    title: "Latina"
},
{
    img: "../assets/imgs/search/image-11.jpg",
    title: "Rock"
},
{
    img: "../assets/imgs/search/image-12.jpg",
    title: "Mood"
},
{
    img: "../assets/imgs/search/image-13.jpeg",
    title: "scopri"
},
{
    img: "../assets/imgs/search/image-14.jpg",
    title: "Di tendenza"
}];

var riga = document.getElementById('searchCard');

for (let i = 0; i < image.length; i++) {
    var red = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var colore = `rgb(${red}, ${blue}, ${green})`;
    const card = `<div class="rounded-3 col-6 col-md-4 col-lg border border-0 mb-4"> <div class="card rounded-3 position-relative overflow-hidden background border border-0" style="background-color: ${colore}">
    <h2 class="text-white card-title fs-4 fw-bold ps-2 pt-3">${image[i].title}</h2>
    <img src="${image[i].img}" class="cardRotate position-absolute" alt="albumCover"></div></div>`;

    riga.innerHTML += card;

}