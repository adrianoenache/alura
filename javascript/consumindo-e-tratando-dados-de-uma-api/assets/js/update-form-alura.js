/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, onTargetEventDoAction, getDataFromViaCep } from './common-functions.js';

const inputCep = $getMySelector('#cep');
const inputEndereco = $getMySelector('#endereco');
const inputBairro = $getMySelector('#bairro');
const inputCidade = $getMySelector('#cidade');
const inputEstado = $getMySelector('#estado');
const errorMessage = $getMySelector('#cep-error');

export function updateAddressInAluraForm() {

  onTargetEventDoAction(inputCep, 'focusout', () => {

    errorMessage.innerHTML = '';

    const requestData = inputCep.value;

    if(requestData) {

      const apiPromise = getDataFromViaCep(requestData);

      apiPromise.then(data => {

        if(data) {

          applyDataInTheFields(data);

        } else {

          errorMessage.innerHTML = `<p>O CEP ${requestData}, é inválido.</p>`;

        }

      });

    }

  });

}

function applyDataInTheFields(data) {

  inputEndereco.value = data.logradouro;
  inputBairro.value = data.bairro;
  inputCidade.value = data.localidade;
  inputEstado.value = data.uf;

}
