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
const $getMySelector = ($target) => {

  if(document.querySelector($target)) {

    return document.querySelector($target);

  } else {

    console.warn('A função $getMySelector não encontrou o elemento.');

  }

}

const $getMySelectors = ($targets) => {

  if(document.querySelector($targets)) {

    return document.querySelectorAll($targets);

  } else {

    console.warn('A função $getMySelectors não encontrou os elementos.');

  }

}

/*

  A função validateBornDate faz a validação do campo passando
  uma mensagem customizada caso o retorno da função ofLegalAge
  seja igual a false.

*/
const validateBornDate = (input) => {

  const dateFromInput = new Date(input.value);
  let message = '';

  if(!ofLegalAge(dateFromInput)) {

    message = 'Você deve ser maior de idade para se cadastrar.';

  }

  input.setCustomValidity(message);

}

/*

  A função ofLegalAge compara a data vinda do campo de input com a
  data atual retornando verdadeiro ou falso. A variável legalAge
  controla a régua de corte da idade legal.

*/
const ofLegalAge = (date) => {

  const legalAge = 18;
  const currentDate = new Date();
  const dateOfLegalAge = new Date(date.getUTCFullYear() + legalAge, date.getUTCMonth(), date.getUTCDate());

  return dateOfLegalAge <= currentDate;

}

/*

  A validateForm agrupa as funções de validação para serem executadas
  após o load da página.

  Nela o seletor do campo de nascimento está sendo armazenado na
  variável $bornDate e adicionado um evento de escuta para executar
  a função validateBornDate quando o campo for alterado.

*/
const validateForm = () => {

  const $bornDate = $getMySelector('#nascimento');

  $bornDate.addEventListener('blur', (event) => {

    validateBornDate(event.target);

  });

}

/*

  Este evento foi adicionado ao window e faz com que as funções
  em seu interior só sejam executadas após o load da página, evitando
  assim que o javascript faça interações com a página antes dela
  estar pronta para isso.

*/
window.addEventListener('load', () => {

  validateForm();

});
