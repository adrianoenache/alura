/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelectors, onTargetEventDoAction } from './common-functions.js';
import { validateCPF } from './validate-cpf.js';

export function startFromValidation() {

  const fieldsToValidate = $getMySelectors('[required]');

  if(!fieldsToValidate) return;

  fieldsToValidate.forEach(filedToValidate => onTargetEventDoAction(filedToValidate, 'blur', () => {

    validateFied(filedToValidate)

  }));

  console.log('form validation');

}

function validateFied(field) {

  console.log('field = ', field.name)

  if(field.name === 'cpf') {

    validateCPF(field);

  }

}
