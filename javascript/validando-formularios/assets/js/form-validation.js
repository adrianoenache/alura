/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo 'app.js', o parâmetro 'type' tenha o valor 'module'.

*/
import { $getMySelector, $getMySelectors, onTargetEventDoAction } from './common-functions.js';
import { validateCPF } from './validate-cpf.js';
import { validateBornDate } from './validate-born-date.js';
import { submitForm } from './form-submit.js'

export function startFromValidation() {

  const fieldsToValidate = $getMySelectors('[required]');
  const formToSubmit = $getMySelector('[data-formulario]');

  submitForm(formToSubmit)

  if(!fieldsToValidate) return;

  fieldsToValidate.forEach(filedToValidate => {

    onTargetEventDoAction(filedToValidate, 'blur', () => {

      validateFied(filedToValidate);

    });

    /*

    Aplicar event.preventDefault no evento invalid vai remover
    as caixas de mensagem de validação do navegador e estas
    mensagens podem ser customizadas atravès do .setCustomValidity
    veja os arquivos validate-cpf.js e validate-born-date.js

    onTargetEventDoAction(filedToValidate, 'invalid', (event) => {

      console.log('### filedToValidate name = ', filedToValidate.name);
      console.log('### filedToValidate validity = ', filedToValidate.validity);
      console.log('### event = ', event);

      event.preventDefault();

    });

    */

  });

  console.log('form validation');

}

function validateFied(field) {

  const typeOfInput = field.name

  if(validateRules[typeOfInput]) {

    validateRules[typeOfInput](field);

  }

  if(field.validity.valid) {

    field.parentElement.querySelector('.mensagem-erro').innerHTML = '';

  } else {

    field.parentElement.querySelector('.mensagem-erro').innerHTML = showErrorMessages(typeOfInput, field);

  }

}

const validateRules = {
  aniversario: input => validateBornDate(input),
  cpf: input => validateCPF(input)
}

const errorTypes = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError'
]

const errorMessages = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um nome válido.',
    tooShort: 'Por favor, preencha um nome válido.'
  },
  email: {
    valueMissing: 'O campo de e-mail não pode estar vazio.',
    typeMismatch: 'Por favor, preencha um email válido.',
    tooShort: 'Por favor, preencha um e-mail válido.'
  },
  rg: {
    valueMissing: 'O campo de RG não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um RG válido.',
    tooShort: 'O campo de RG não tem caractéres suficientes.'
  },
  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um CPF válido.',
    customError: 'O CPF digitado não existe.',
    tooShort: 'O campo de CPF não tem caractéres suficientes.'
  },
  aniversario: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.'
  },
  termos: {
    valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
  }
}

const showErrorMessages = (typeOfField, element) => {

  let message = '';

  errorTypes.forEach(error => {

    if(element.validity[error]) {

      message = errorMessages[typeOfField][error];

    }

  });

  return message;

}
