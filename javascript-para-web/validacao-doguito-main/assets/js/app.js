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
  const simpleMaskMoneyConfig = {
    prefix: 'R$ ',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'end'
  }

  fields.forEach(field => {

    // Faz a verificação do tipo de input para aplicar a máscara.
    if(field.dataset.type === 'preco') {

/*

  Máscara monetária
  Git https://github.com/codermarcos/simple-mask-money
  Chamada no HTML <script src="https://github.com/codermarcos/simple-mask-money/releases/download/v3.0.0/simple-mask-money.js"></script>

  A função SimpleMaskMoney recebe como parâmetro o input alvo e as configurações do plugin.

*/
      SimpleMaskMoney.setMask(field, simpleMaskMoneyConfig);

    }

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

  validateForm();

});
