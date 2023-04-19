function checkPromise() {
    let promise = document.getElementById('promise');
    let divForm = document.getElementById('btn');
    let paragrafoErrore = document.getElementById('paragrafoErrore');

    if (promise.checked) {
        window.location.href = 'quiz.html';
    } else {
        if (!paragrafoErrore) {
            // Verifica se il paragrafo di errore esiste già
            paragrafoErrore = document.createElement('p');
            paragrafoErrore.id = 'paragrafoErrore';
            paragrafoErrore.textContent = 'You must accept the conditions to proceed with the quiz.';
            paragrafoErrore.style.color = '#D20094';
            divForm.appendChild(paragrafoErrore);
        }
    }
}