/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo 'app.js', o parâmetro 'type' tenha o valor 'module'.

*/
import { onTargetEventDoAction, setLocalStorageData } from './common-functions.js';

export function submitForm(formTarget) {

  if(!formTarget) return

  onTargetEventDoAction(formTarget, 'submit', (event) => {

    event.preventDefault()

    const formValuesToSend = {
      "name": event.target.elements["nome"].value,
      "email": event.target.elements["email"].value,
      "rg": event.target.elements["rg"].value,
      "cpf": event.target.elements["cpf"].value,
      "birthday": event.target.elements["aniversario"].value
    }

    setLocalStorageData('cadastro', formValuesToSend)

    console.log("### formValuesToSend = ", formValuesToSend)

    window.location.href = './abrir-conta-form-2.html'

  })

}
