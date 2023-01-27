/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector } from './common-functions.js';
import { getDataFromAPI, getDataFromForm, filterTheVideos } from './alura-play.js';

window.aluraPlayData = '';

const initCode = () => {

  const $dataLista = $getMySelector('[data-lista]');
  const $dataFromForm = $getMySelector('[data-form]');

  if($dataLista) getDataFromAPI($dataLista);
  if($dataLista) filterTheVideos();

  if($dataFromForm) getDataFromForm($dataFromForm);

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
