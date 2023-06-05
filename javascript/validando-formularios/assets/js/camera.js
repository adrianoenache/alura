import { $getMySelector, onTargetEventDoAction, removeCssClass, addCssClass } from './common-functions.js';

export function takePicture () {

  const startCam = $getMySelector('[data-video-botao]');
  const cam = $getMySelector('[data-camera]');
  const video = $getMySelector('[data-video]');

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

}
