/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelectors } from './common-functions.js';
import { startRobotronControls } from './robotron.js';

const initCode = () => {

  const selectControls =  $getMySelectors('.controle');

  startRobotronControls(selectControls);

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
