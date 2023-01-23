/*

Para os imports funcionem, é necessário que no HTML onde é importado
o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, createElementFromTemplateOnTarget, getDataFrom } from './common-functions.js';

const nameOfAPI = 'AluraPlay';
const urlOfAPI = 'http://localhost:3000/videos';
const optionsAPI = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
};

const listOfVideos = $getMySelector('[data-lista]');

export function dataFromAPI(replace) {

  const apiPromise = getDataFrom(urlOfAPI, optionsAPI, nameOfAPI);

  apiPromise.then(data => {

    if(data) {

      aluraPlayData = data;

      loadVideocards(aluraPlayData, replace);

    } else {

      console.warn(`Erro na consulta da API ${nameOfAPI}`);

    }

  });

}

function templateCard(data) {

  let template = `
    <li class="videos__item">
      <iframe
        width="100%"
        height="72%"
        src="${data.url}"
        title="${data.titulo}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <div class="descricao-video">
          <img src="${data.imagem}" alt="${data.titulo}">
          <h3>
            ${data.titulo}
          </h3>
          <p>
            ${data.descricao}
          </p>
      </div>
    </li>
  `;

  return template;

}

export function loadVideocards(dataToLoad, replace = false) {

  if(replace === 'replace') {

    listOfVideos.innerHTML = '';

  }

  if(dataToLoad) {

    dataToLoad.forEach(data => {

      let template = templateCard(data);

      createElementFromTemplateOnTarget(listOfVideos,template);

    });

  }

}
