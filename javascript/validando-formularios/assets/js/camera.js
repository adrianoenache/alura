import { $getMySelector, onTargetEventDoAction, removeCssClass, addCssClass, getLocalStorageData, setLocalStorageData } from './common-functions.js';

export function takePicture () {

  const startCam = $getMySelector('[data-video-botao]');
  const cam = $getMySelector('[data-camera]');
  const video = $getMySelector('[data-video]');
  const buttonGetPhoto = $getMySelector('[data-tirar-foto]');
  const videoCanvas = $getMySelector('[data-video-canvas]');
  const messageField = $getMySelector('[data-mensagem]');
  const buttonSendPhoto = $getMySelector('[data-enviar]');

  let imagemURL = '';

  if(!startCam && !cam && !video) return;

  onTargetEventDoAction(startCam, 'click', async function() {

    const startVideoStream =  await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });

    addCssClass(startCam, 'hide');
    removeCssClass(cam, 'hide');

    video.srcObject = startVideoStream;

  });

  onTargetEventDoAction(buttonGetPhoto, 'click', () => {

    videoCanvas.getContext('2d').drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

    imagemURL = videoCanvas.toDataURL('image/jpg');

    addCssClass(cam, 'hide');
    removeCssClass(messageField, 'hide');

  });

  onTargetEventDoAction(buttonSendPhoto, 'click', () => {

    const updateLocalStorageData = getLocalStorageData('cadastro');
    updateLocalStorageData.imagem = imagemURL;
    setLocalStorageData('cadastro', updateLocalStorageData);

    window.location.href='./abrir-conta-form-3.html';

  });

}
