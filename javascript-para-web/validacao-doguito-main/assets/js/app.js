/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelectors } from './common-functions.js';
import { validate } from './form-validation.js';

/*

  A validateForm agrupa as funções de validação para serem executadas
  após o load da página.

*/
const validateForm = () => {

  const fields = $getMySelectors('input');

  fields.forEach(field => {

    field.addEventListener('blur', (event) => {

      validate(event.target);

    })

  })

}

/*

  Este evento foi adicionado ao window e faz com que as funções
  em seu interior só sejam executadas após o load da página, evitando
  assim que o javascript faça interações com a página antes dela
  estar pronta para isso.

*/
window.addEventListener('load', () => {

  console.log('Hello');
  validateForm();

});
