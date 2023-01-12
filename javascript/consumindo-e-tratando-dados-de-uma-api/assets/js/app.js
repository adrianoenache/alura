/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { getDataFromViaCep } from './common-functions.js';

const initCode = () => {

  const apiReturn = getDataFromViaCep('01530-010');

  console.log('getDataFromViaCep = ', apiReturn);

}

/*

  Este evento foi adicionado ao window e faz com que as funções
  em seu interior só sejam executadas após o load da página, evitando
  assim que o javascript faça interações com a página antes dela
  estar pronta para isso.

*/
window.addEventListener('load', () => {

  initCode();

});
