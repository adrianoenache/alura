/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, $getMySelectors, onTargetEventDoAction, createElementFromTemplateOnTarget, setLocalStorageData, getLocalStorageData } from './common-functions.js';

const $backpacktList = $getMySelector('.lista');
let backpackData = getLocalStorageData('myBackpack') || [];

export function startBackpack($target) {

  wachForChangesOnList($backpacktList);

  loadBackpackData(backpackData);

  onTargetEventDoAction($target, 'submit', onSubmitDoAction);

}

function wachForChangesOnList(target) {

  let wachList = new MutationObserver(whatChange => {

    addRemoveElementActionOnclick();

  });

  wachList.observe(target, {
    childList: true,
    subtree: true
  });

}

function addRemoveElementActionOnclick() {

  const targetItens = $getMySelectors('.item');

  if (targetItens) {

    targetItens.forEach((element, index) => {

      element.addEventListener('click', () => {

        backpackData.splice(index, 1);
        element.remove();

        setLocalStorageData('myBackpack', backpackData);
        backpackData = getLocalStorageData('myBackpack') || [];

      });

    });

  }

}

function loadBackpackData(dataFromBackpack) {

  if(dataFromBackpack) {

    dataFromBackpack.forEach((data) => {

      const template = `<li class="item"><strong>${data.quantity}</strong> ${data.item}</li>`;

      createElementFromTemplateOnTarget($backpacktList, template);

    });

  }

}

function onSubmitDoAction(event) {

  event.preventDefault();

  const itemName = event.target.elements['nome'].value;
  const itemQuantity = event.target.elements['quantidade'].value;

  const itemExist = backpackData.find(element => element.item === itemName);
  const itemExistPosition = backpackData.findIndex(element => element.item === itemName);

  const data = {
    item: itemName,
    quantity: itemQuantity
  }

  const template = `<li class="item"><strong>${data.quantity}</strong> ${data.item}</li>`;

  const elementToUpdate = $getMySelectors('.item');

  if(itemExist) {

    if(itemQuantity == "" || itemQuantity == 0) {

      removeItensFromList(elementToUpdate, itemExistPosition);

    } else {

      backpackData[itemExistPosition].quantity = itemQuantity;

      if(elementToUpdate) {

        elementToUpdate[itemExistPosition].querySelector('strong').innerHTML = itemQuantity;

      }

    }

  } else {

    createElementFromTemplateOnTarget($backpacktList, template);
    backpackData.push(data);

  }

  setLocalStorageData('myBackpack', backpackData);

  event.target.querySelector('#nome').focus();
  event.target.reset();

}

function removeItensFromList(element, index) {

  backpackData.splice(index, 1);
  element[index].remove();

}

/*
function createBackpackItemOnList(itemName, itemQuantity) {

  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const newQuantityItem = document.createElement('strong');
  newQuantityItem.innerHTML = itemQuantity;

  newItem.appendChild(newQuantityItem);
  newItem.innerHTML += itemName;

  $backpacktList.appendChild(newItem);

}
*/
