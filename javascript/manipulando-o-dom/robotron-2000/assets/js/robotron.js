/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { onTargetEventDoAction } from './common-functions.js';

export function startRobotronControls(getControls) {

  getControls.forEach(controlPatrs => {

    const btnAdddPart = controlPatrs.querySelector('.somar');
    const btnRemovePart = controlPatrs.querySelector('.subtrair');

    onTargetEventDoAction(btnAdddPart, 'click', addRemoveParts);
    onTargetEventDoAction(btnRemovePart, 'click', addRemoveParts);

  });

}

function addRemoveParts(element) {

  const maxValue = 10;
  const minValue = 0;

  let elementValue = element.path[1].querySelector('.controle-contador');
  let currentValue = parseInt(elementValue.value);

  if(element.path[0].classList.contains('somar')) {

    let addNewPart = currentValue + 1;

    if(currentValue < maxValue) {

      elementValue.value = addNewPart;

    }

  }

  if(element.path[0].classList.contains('subtrair')) {

    let removeNewPart = currentValue - 1;

    if(currentValue > minValue) {

      elementValue.value = removeNewPart;

    }

  }

}
