/*

  Reutilizando função do common-functions.js

*/
import { $getMySelector } from '../common-functions.js';

/*

  A função pullCEP recebe o valor do input e o trata
  para então configurar a URL que faz a chamada da
  API. Em caso de erro uma mensagem customizada é
  definida. E em caso de sucesso é chamada uma função
  que preenche os campos.

*/
export const pullCEP = (input) => {

  const formatCEP = input.value.replace(/\D/g, '');

  const urlAPI = `https://viacep.com.br/ws/${formatCEP}/json/`;
  const optionsAPI = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    }
  }

  if(!input.validity.patternMismatch && !input.validity.valueMissing) {

    fetch(urlAPI, optionsAPI).then(

      response => response.json()

    ).then(

      data => {

        if(data.erro) {

          input.setCustomValidity('O CEP digitado não foi encontrado.');

          return;

        }

        input.setCustomValidity('');

        fillFieldsWithDataFromCEP(data);

        return;

      }

    );

  }

}

/*

  A função fillFieldsWithDataFromCEP recebe os
  dados da API e preenche os campos com os dados.

*/
const fillFieldsWithDataFromCEP = (data) => {

  const logradouro = $getMySelector('[data-type="logradouro"]');
  const cidade = $getMySelector('[data-type="cidade"]');
  const estado = $getMySelector('[data-type="estado"]');

  logradouro.value = data.logradouro;
  cidade.value = data.localidade;
  estado.value = data.uf;

}
