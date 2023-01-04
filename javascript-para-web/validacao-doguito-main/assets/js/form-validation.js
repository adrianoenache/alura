/*

  O arquivo foi dividido em outros arquivos para facilitar
  legibilidade e reutilização do código.

*/
import { validateBornDate } from './form-validations/validate-born-date.js';
import { validateCPF } from './form-validations/validate-cpf.js';
import { pullCEP } from './pull-api/pull-cep.js';

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
  cpf:input => validateCPF(input),
  cep:input => pullCEP(input)
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
    customError: 'O CPF digitado não é valido, ele deve conter 11 digitos ex.: 000.000.000-00, 00000000000.'
  },
  cep: {
    valueMissing: 'O campo CEP não pode estar vazio.',
    patternMismatch: 'O CEP digitado não é valido, ele deve conter 8 digitos ex.: 00000-000, 00000000.',
    customError: 'O CEP digitado não foi encontrado.'
  },
  logradouro: {
    valueMissing: 'O campo logradouro não pode estar vazio.'
  },
  cidade: {
    valueMissing: 'O campo cidade não pode estar vazio.'
  },
  estado: {
    valueMissing: 'O campo estado não pode estar vazio.'
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
