const $myTarget = document.querySelector('#calcular');
const $myTarget2 = document.querySelector('.resultado');

function meClick(myElement) {

  myElement.addEventListener('click', (event) => {

    console.log('Hello there click!', event);

    $myTarget2.innerText = 'Hello there click!';

  });

}

window.addEventListener('load', () => {

  meClick($myTarget);

});
