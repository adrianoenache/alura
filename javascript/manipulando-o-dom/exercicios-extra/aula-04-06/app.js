/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, onTargetEventDoAction } from './common-functions.js';


const initCode = () => {

  const btnShow =  $getMySelector('[data-list="show"]');
  const btnHide =  $getMySelector('[data-list="hide"]');

  onTargetEventDoAction(btnShow, 'click', setDocumentLocationHash);
  onTargetEventDoAction(btnHide, 'click', resetDocumentLocationHash);

}

function setDocumentLocationHash() {

  document.location.hash = 'lista';

}

function resetDocumentLocationHash() {

  document.location.hash = '';
  document.location.reload();

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
