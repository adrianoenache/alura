/*

  A função validateBornDate faz a validação do campo passando
  uma mensagem customizada caso o retorno da função ofLegalAge
  seja igual a false.

*/
export const validateBornDate = (input) => {

  const fieldValue = input.value;

  const dateFromInput = new Date(fieldValue);
  let message = '';


  if(fieldValue === '') {

    message = 'O campo de data de nascimento não pode estar vazio.';

  } else if(!ofLegalAge(dateFromInput)) {

    message = 'Você deve ser maior de idade para se cadastrar!';

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
