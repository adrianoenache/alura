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

    return false;

  }

}

export function $getMySelectors($targets) {

  if(document.querySelector($targets)) {

    return document.querySelectorAll($targets);

  } else {

    console.warn('A função $getMySelectors não encontrou os elementos.');

    return false;

  }

}

/*
  A onTargetEventDoAction recebe como parâmetro um elemento
  alvo, o tipo de evento gatilho e uma função para executar.
*/
export function onTargetEventDoAction($target, event, doAction) {

  $target.addEventListener(event, doAction);

}

export function createElementFromTemplateOnTarget($target, template) {

  $target.innerHTML += template;

}

export function setLocalStorageData(key, value) {

  localStorage.setItem(key, JSON.stringify(value));

}

export function getLocalStorageData(key) {

  return JSON.parse(localStorage.getItem(key));

}

/*

  A função getDataFromViaCep

*/
export async function getDataFromViaCep(cepRequested) {

  const formatCEP = cepRequested.replace(/\D/g, '');

  if(formatCEP.length !== 8) {

    console.warn(`O formato do CEP ${formatCEP} é inválido, ele deve conter 8 digitos.`);

    return;

  }

  const urlAPI = `https://viacep.com.br/ws/${formatCEP}/json/`;
  const optionsAPI = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  fetch(urlAPI, optionsAPI)
  .then(

    response => response.json()

  )
  .then(

    data => {

      if(data.erro) {

        console.error(`O CEP ${cepRequested} não foi encontrado`, data);

      } else {

        console.log('data', data);

      }

    }

  ).catch(

    erro => console.warn(erro)

  ).finally(

    msg => console.log('Pocesso de consulta da API foi finalizado.')

  );

}
