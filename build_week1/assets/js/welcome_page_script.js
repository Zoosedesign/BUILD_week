function checkPromise() {

    let promise = document.getElementById('promise');
    let divForm = document.getElementById('btn');
    let paragrafoErrore = document.createElement('p');
    if(promise.checked){
        window.location.href = 'test.html';
    }else{
        paragrafoErrore.textContent = 'You must accept the conditions to proceed with the quiz.'
        paragrafoErrore.style.color = 'purple';
        divForm.appendChild(paragrafoErrore);
    }
}