/*

  A função validate recebe o campo a ser testado pelo
  parâmetro input, então é armazenado na variável typeOfInput
  o tipo do campo. Em seguida é testado se o campo possui
  uma validação customizada armazenada no objeto validateRules,
  para então aplicar/remover classes de erro e suas mensagens.

*/
export const validate = (input) => {

  const typeOfInput = input.dataset.type

  if(validateRules[typeOfInput]) {

    validateRules[typeOfInput](input);

  }

  if(input.validity.valid) {

    input.parentElement.classList.remove('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';

  } else {

    input.parentElement.classList.add('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = showErrorMessages(typeOfInput, input);

  }

}

/*

  O objeto validateRules armazena chaves com funções
  personalizadas de validação.

*/
const validateRules = {
  dataDeNascimento:input => validateBornDate(input),
  cpf:input => validateCPF(input)
}

/*

  O objeto errorMessages contém objetos cujas chaves
  representam o tipo de campo, e dentro destes objetos
  estão as chaves dos tipos de erros testados para cada
  objeto, com suas respectivas mensagens de erro.

*/
const errorMessages = {
  nome: {
    valueMissing: 'O campo nome não pode estar vazio.'
  },
  email: {
    valueMissing: 'O campo email não pode estar vazio.',
    typeMismatch: 'O email digitado não é valido.'
  },
  senha: {
    valueMissing: 'O campo senha não pode estar vazio.',
    patternMismatch: 'A senha digitada não é valida, ela deve conter de 6 a 12 caracteres. Deve conter letras minúsculas, maiúsculas e números. Não deve conter símbolos.'
  },
  dataDeNascimento: {
    valueMissing: 'O campo data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior de idade para se cadastrar!'
  },
  cpf: {
    valueMissing: 'O campo CPF não pode estar vazio.',
    customError: 'O CPF digitado não é valido.'
  }
}

/*

  A lista errorTypes possui os nomes das propriedades
  dos tipos de erros a serem testados.

*/
const errorTypes = ['customError', 'typeMismatch', 'patternMismatch', 'valueMissing'];


/*

  A função showErrorMessages recebe como parâmetros
  o elemento do campo que está sendo testado e seu
  tipo. Onde então através de uma ação loop verifica
  quais tipos de erro o elemento está retornando, para
  então retornar uma mensagem de erro apropriada para
  cada tipo encontrado.

*/
const showErrorMessages = (typeOfField, element) => {

  let message = '';

  errorTypes.forEach(error => {

    if(element.validity[error]) {

      message = errorMessages[typeOfField][error];

    }

  });

  return message;

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

const validateCPF = (input) => {

  const formatCPF = input.value.replace(/\D/g, '');

  let message = '';

  if(!checkCPFRepeatedNumbers(formatCPF) || !checkCPFStructure(formatCPF)) {

    message = 'O CPF digitado não é valido.';

  }

  input.setCustomValidity(message);

}

const checkCPFRepeatedNumbers = (cpf) => {

  const repeatedNumbers = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  let cpfHasRepeatedNumbers = true;

  repeatedNumbers.forEach(repeatedNumber => {

    if(repeatedNumber == cpf) {

      cpfHasRepeatedNumbers = false;

    }

  });

  return cpfHasRepeatedNumbers;

}

const checkCPFStructure = (cpf) => {

  const multiplier = 10;

  return digitVerifier(cpf, multiplier);
}

const digitVerifier = (cpf, multiplier) => {


  if(multiplier >= 12) {

    return true;

  }

  let initialMultiplier = multiplier;
  let sum = 0;
  const cpfNoDigits = cpf.substr(0, multiplier - 1).split('');
  const digitToVerify = cpf.charAt(multiplier - 1);

  for(let count = 0; initialMultiplier > 1; initialMultiplier--) {

    sum = sum + cpfNoDigits[count] * initialMultiplier;

    count++;

  }

  if(digitToVerify == confirmType(sum)) {


    return digitVerifier(cpf, multiplier + 1);

  }

  return false;

}

const confirmType = (sum) => {

  if((11 - (sum % 11)) == 10) {

    return 0;

  } else {

    return 11 - (sum % 11);

  }

}
