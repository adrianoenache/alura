/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, onTargetEventDoAction, createElementFromTemplateOnTarget } from './common-functions.js';

const $backpacktList = $getMySelector('.lista');

export function startBackpackForm($target) {

  console.log('### target ', $target);

  onTargetEventDoAction($target, 'submit', onSubmitDoAction);

}

function onSubmitDoAction(event) {

  event.preventDefault();

  const itemName = event.target.elements['nome'].value;
  const itemQuantity = event.target.elements['quantidade'].value;

  // createBackpackItemOnList(itemName, itemQuantity);

  const data = {
    item: itemName,
    quantity: itemQuantity
  }

  const template = `<li class="item"><strong>${data.quantity}</strong> ${data.item}</li>`;

  createElementFromTemplateOnTarget($backpacktList, template);

}

function createBackpackItemOnList(itemName, itemQuantity) {

  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const newQuantityItem = document.createElement('strong');
  newQuantityItem.innerHTML = itemQuantity;

  newItem.appendChild(newQuantityItem);
  newItem.innerHTML += itemName;

  $backpacktList.appendChild(newItem);

}
