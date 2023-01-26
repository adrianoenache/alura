/*

Para os imports funcionem, é necessário que no HTML onde é importado
o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, createElementFromTemplateOnTarget, onTargetEventDoAction, setLocalStorageData, getLocalStorageData, connectWithTheAPI } from './common-functions.js';

const nameOfAPI = 'AluraPlay';
const urlOfAPI = 'http://localhost:3000/videos';
const optionsAPI = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
};
const localStorageVideos = 'videos';
const localStorageUpdateFlag = 'update-videos';

let updateStatus = getLocalStorageData(localStorageUpdateFlag);

let listOfVideos = '';

export function getDataFromAPI($target) {

  listOfVideos = $target;

  if(updateStatus == 'do-not-update') {

    aluraPlayData = getLocalStorageData(localStorageVideos);

    loadVideocards(aluraPlayData);

    return;

  }

  const apiPromise = connectWithTheAPI(urlOfAPI, optionsAPI, nameOfAPI);

  apiPromise.then(data => {

    if(!data) {

      console.warn(`Erro na consulta da API ${nameOfAPI}`);

      return;

    }

    setLocalStorageData(localStorageVideos, data);
    setLocalStorageData(localStorageUpdateFlag, 'do-not-update');

    aluraPlayData = getLocalStorageData(localStorageVideos);

    loadVideocards(aluraPlayData);

  });

}

function templateCard(data) {

  if(!data) return;

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

function loadVideocards(dataToLoad) {

  if(!dataToLoad) return;

  listOfVideos.innerHTML = '';

  dataToLoad.forEach(data => {

    let template = templateCard(data);

    createElementFromTemplateOnTarget(listOfVideos, template);

  });

}

export function getDataFromForm($targetForm) {

  const fieldUrl = $getMySelector('[data-url]');
  const fieldTitle = $getMySelector('[data-titulo]');
  const fieldImage = $getMySelector('[data-imagem]');

  if(!fieldUrl || !fieldTitle || !fieldImage) return;


  onTargetEventDoAction($targetForm, 'submit', event => {

    event.preventDefault();

    const descriptionValue = generateRandomDescription();

    const postOptionsAPI = configPostOptionsAPI(fieldTitle.value, descriptionValue, fieldUrl.value, fieldImage.value);

    postDataInAPI(postOptionsAPI);

  });

}

function generateRandomDescription() {

  const randomNumber = Math.floor(Math.random() * 10);
  const message = `${randomNumber} mil visualizações`;

  return message;

}

function postDataInAPI(postOptionsAPI){

  const apiPromise = connectWithTheAPI(urlOfAPI, postOptionsAPI, nameOfAPI);

  apiPromise.then(data => {

    if(!data) {

      console.warn(`Erro no post da API ${nameOfAPI}`);

      return;

    }

    setLocalStorageData(localStorageUpdateFlag, 'do-the-update');

    window.location.href = '../pages/envio-concluido.html';

  });

}

function configPostOptionsAPI(titulo, descricao, url, imagem) {

  const optionsAPI = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: descricao,
      url: url,
      imagem: imagem
    })
  };

  return optionsAPI;

}
