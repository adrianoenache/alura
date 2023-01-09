/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelectors, onTargetEventDoAction } from './common-functions.js';

export function startRobotronControls(getControls) {

  const controls = getControls;

  controls.forEach(controlPatrs => {

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

      updateAssemblyStatsInfo(elementValue, 'addPart');

    }

  }

  if(element.path[0].classList.contains('subtrair')) {

    let removeNewPart = currentValue - 1;

    if(currentValue > minValue) {

      elementValue.value = removeNewPart;

      updateAssemblyStatsInfo(elementValue, 'removePart');

    }

  }

  updateAssemblyStatsInfo(elementValue);

}

function updateAssemblyStatsInfo(part, action) {

  let setPanelInfo =  $getMySelectors('[data-assembly-stats-info]');


  setPanelInfo.forEach(panelInfo => {

    if(action === 'addPart') {

      panelInfo.textContent = parseInt(panelInfo.textContent) + partsStatsInfo[part.dataset.part][panelInfo.dataset.assemblyStatsInfo];

    }

    if(action === 'removePart') {

      panelInfo.textContent = parseInt(panelInfo.textContent) - partsStatsInfo[part.dataset.part][panelInfo.dataset.assemblyStatsInfo];

    }

  });

}

export function startPanelInfo(getPanelInfo) {

  getPanelInfo.forEach(panelInfo => {

    panelInfo.textContent = assemblyStatsInfo['robotron'][panelInfo.dataset.assemblyStatsInfo];

  });

}

const assemblyStatsInfo = {
  "robotron": {
    "forca": 0,
    "poder": 0,
    "energia": 0,
    "velocidade": 0
  }
}

const partsStatsInfo = {
  "bracos": {
    "forca": 29,
    "poder": 35,
    "energia": -21,
    "velocidade": -5
  },
  "blindagem": {
    "forca": 41,
    "poder": 20,
    "energia": 0,
    "velocidade": -20
},
  "nucleos":{
    "forca": 0,
    "poder": 7,
    "energia": 48,
    "velocidade": -24
  },
  "pernas":{
    "forca": 27,
    "poder": 21,
    "energia": -32,
    "velocidade": 42
  },
  "foguetes":{
    "forca": 0,
    "poder": 28,
    "energia": 0,
    "velocidade": -2
  }
}
