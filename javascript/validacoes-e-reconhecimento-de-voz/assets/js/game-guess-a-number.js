/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector } from './common-functions.js';

let guessThisNumber = '';
let newSpeechRecognition = '';
const limitNumber = 1000;
const baseNumber = 1;
const elementResult = $getMySelector('#chute');

export function startGameGessANumber() {

  guessThisNumber = raffleANumber(limitNumber);
  console.log('guessThisNumber', guessThisNumber);

  const elementMinValue = $getMySelector('#menor-valor');
  const elementMaxValue = $getMySelector('#maior-valor');

  elementMinValue.innerHTML = baseNumber;
  elementMaxValue.innerHTML = limitNumber;

  startWebSpeech();

}

function raffleANumber(setLimitNumber) {

  const raffle = Math.random() * setLimitNumber + 1;

  return parseInt(raffle);

}

/*
  A função startWebSpeech inicializa as configurações do web speech API
*/
function startWebSpeech() {

  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  newSpeechRecognition = new SpeechRecognition();

  newSpeechRecognition.lang = 'pt-BR';
  newSpeechRecognition.start();

  newSpeechRecognition.addEventListener('result', onSpeack);
  newSpeechRecognition.addEventListener('end', () => {

    if(newSpeechRecognition) {

      newSpeechRecognition.start();

    }

  });

}

function onSpeack(event) {

  const myGuess = event.results[0][0].transcript;
  elementResult.innerHTML = `<div>Você disse:</div><span class="box">${myGuess}</span>`;

  verifyMyGuess(myGuess);

}

function verifyMyGuess(myGuess) {

  let number = +myGuess;

  if(myGuess == 'Game Over.') {

    gameOver();

    console.log('Game Over.');

    return;

  }

  if(myGuess == 'Um.') {

    number = 1;

  }

  if(myGuess == 'Zero.') {

    elementResult.innerHTML += '<div>O valor não pode ser zero.</div>';

  }

  if(checkIfIsNumber(number) && myGuess !== 'Zero.') {

    elementResult.innerHTML += '<div>Valor inválido, fale um número.</div>';

  }

  if(checkIfNumberIsInRange(number)) {

    elementResult.innerHTML += `<div>O valor inválido, escolha um número entre ${baseNumber} e ${limitNumber}</div>`;

  }

  if(number < guessThisNumber) {

    elementResult.innerHTML += `<div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>`;

  }

  if(number > guessThisNumber) {

    elementResult.innerHTML += `<div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>`;

  }

  if(number == guessThisNumber) {

    elementResult.innerHTML += `<div>
    <p>Você acertou o número sorteado ${guessThisNumber}!!!</p>
    <p>Tente acertar outro.</p>
    <p>Ou diga <strong>Game Over</strong> para finalizar.</p>
    </div>`;

    guessThisNumber = raffleANumber(limitNumber);
    console.log('new guessThisNumber', guessThisNumber);

  }

}

function checkIfIsNumber(value) {

  return Number.isNaN(value);

}

function checkIfNumberIsInRange(value) {

  return value > limitNumber || value < baseNumber;

}

function gameOver() {

  newSpeechRecognition = '';

  elementResult.innerHTML += `<div><button id="restart-game" type="button">Recomeçar jogo</button></div>`;

  elementResult.querySelector('#restart-game').addEventListener('click', () => {

    window.location.reload();

  });

}
