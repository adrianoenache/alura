/*

  Reaproveitar código é ganhar tempo. Para escrever código
  que possa ser facilmente reaproveitado ele deve ser pequeno,
  especialista, fazer uma única coisa, ser uma peça de lego
  capaz de se conectar com outras obtendo resultados diferentes.

*/

/*

  As funções $getMySelector e $getMySelectors são seletores de
  elementos e fazem um teste, verificando se o/s elemento/s existem
  na página, retornando um aviso no console em caso negativo ou
  retornando o elemento ou a lista de elementos para a quem
  chamou estas funções.

*/
export function $getMySelector($target) {

  if(document.querySelector($target)) {

    return document.querySelector($target);

  } else {

    console.warn('A função $getMySelector não encontrou o elemento.');

  }

}

export function $getMySelectors($targets) {

  if(document.querySelector($targets)) {

    return document.querySelectorAll($targets);

  } else {

    console.warn('A função $getMySelectors não encontrou os elementos.');

  }

}

/*
  A onTargetEventDoAction recebe como parâmetro um elemento
  alvo, o tipo de evento gatilho e uma função para executar.
*/
export function onTargetEventDoAction($target, event, doAction) {

  $target.addEventListener(event, doAction);

}
