export const validate = (input) => {

  const typeOgInput = input.dataset.type

  if(validateRules[typeOgInput]) {

    validateRules[typeOgInput](input);

  }

}

const validateRules = {
  dataDeNascimento:input => validateBornDate(input)
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
