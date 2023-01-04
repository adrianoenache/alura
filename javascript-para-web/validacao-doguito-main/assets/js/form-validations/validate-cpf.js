/*

  A função validateCPF faz a validação do
  número de CPF através de um cálculo matemático
  e outras validações.

*/
export const validateCPF = (input) => {

  const formatCPF = input.value.replace(/\D/g, '');

  let message = '';

  if(!checkCPFRepeatedNumbers(formatCPF) || !checkCPFStructure(formatCPF)) {

    message = 'O CPF digitado não é valido.';

  }

  input.setCustomValidity(message);

}

/*

  A função checkCPFRepeatedNumbers verifica se o
  valor recebido é uma sequência de números iguais.

*/
const checkCPFRepeatedNumbers = (cpf) => {

  const repeatedNumbers = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  let cpfHasRepeatedNumbers = true;

  repeatedNumbers.forEach(repeatedNumber => {

    if(repeatedNumber == cpf) {

      cpfHasRepeatedNumbers = false;

    }

  });

  return cpfHasRepeatedNumbers;

}

/*

  A função checkCPFStructure inicia a checagem da
  estrutura do CPF, recebendo o valor do input e
  definindo a posição do primeiro digito verificador.

*/
const checkCPFStructure = (cpf) => {

  const multiplier = 10;

  return digitVerifier(cpf, multiplier);

}

/*

  A função faz o cálculo que valida o CPF.

*/
const digitVerifier = (cpf, multiplier) => {

  // Se a posição do digito verificador é maior ou igual a 12 a função termina.
  if(multiplier >= 12) {

    return true;

  }

  // É armazenado em initialMultiplier a posição inicial do digito multiplicador.
  let initialMultiplier = multiplier;
  let sum = 0;

  // Armazena em uma lista os dígitos que devem fazer parte do cálculo.
  const cpfNoDigits = cpf.substr(0, multiplier - 1).split('');

  // Armazena o digito verificador.
  const digitToVerify = cpf.charAt(multiplier - 1);

  for(let count = 0; initialMultiplier > 1; initialMultiplier--) {

    // Faz a multiplicação e soma dos dígitos.
    sum = sum + cpfNoDigits[count] * initialMultiplier;

    count++;

  }

  /*

   Faz a comparação se o digito verificador do CPF
   é igual ao digito verificador gerado. Em caso
   positivo, a função chama a si mesma alterando
   a posição para verificar o segundo digito
   verificador é valido.

  */
  if(digitToVerify == confirmType(sum)) {


    return digitVerifier(cpf, multiplier + 1);

  }

  return false;

}

/*

  A função confirmType recebe a resultado da
  multiplicação e soma, para então fazer o
  cálculo que gera um digito verificador e
  faz o retorno deste digito.

*/
const confirmType = (sum) => {

  if((11 - (sum % 11)) == 10) {

    return 0;

  } else {

    return 11 - (sum % 11);

  }

}
