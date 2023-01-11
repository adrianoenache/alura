/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector } from './common-functions.js';

let guessThisNumber = '';
const limitNumber = 1000;
const baseNumber = 1;

export function startGameGessANumber() {

  guessThisNumber = raffleANumber(limitNumber);
  console.log('guessThisNumber', guessThisNumber);

  const elementMinValue = $getMySelector('#menor-valor');
  const elementMaxValue = $getMySelector('#maior-valor');

  elementMinValue.innerHTML = baseNumber;
  elementMaxValue.innerHTML = limitNumber;

}

function raffleANumber(setLimitNumber) {

  const raffle = Math.random() * setLimitNumber + 1;

  return parseInt(raffle);

}
