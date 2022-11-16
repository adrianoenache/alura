/*

  Reaproveitar código é ganhar tempo. Para escrever código
  que possa ser facilmente reaproveitado ele deve ser pequeno,
  especialista, fazer uma única coisa, ser uma peça de lego
  capaz de se conectar com outras obtendo resultados diferentes.

*/

/*

  As funções $getMySelector e $getMySelectors são seletores de
  elementos e fazem um teste, verificando se o/s elemento/s existem
  na página, retornando um aviso no console em caso negativo ou
  retornando o elemento ou a lista de elementos para a quem
  chamou estas funções.

*/
const $getMySelector = ($target) => {

  if(document.querySelector($target)) {

    return document.querySelector($target);

  } else {

    console.warn('A função $getMySelector não encontrou o elemento.');

  }

}

const $getMySelectors = ($targets) => {

  if(document.querySelector($targets)) {

    return document.querySelectorAll($targets);

  } else {

    console.warn('A função $getMySelectors não encontrou os elementos.');

  }

}

/*

  As funções addCssClass e removeCssClass recebem como primeiro parâmetro
  um elemento alvo ou a string de um seletor CSS e como segundo parâmetro
  uma classe de CSS ex.: ".active". Estas funções fazem duas verificações
  a primeira através de uma outra função checkIfMySelectorIsString que verifica
  se o valor do primeiro parâmetro é uma string na forma de um seletor CSS
  se verdadeiro a função retornara o elemento e se falso significa que
  o target já é um elemento selecionado e o retorna. A segunda verificação
  testa de o elemento alvo tem ou não a classe passada no segundo parâmetro
  para então adicionar ou remover a classe CSS.

*/
const checkIfMySelectorIsString = ($target) => {

  if(typeof $target === 'string') {

    return $getMySelector($target);

  } else {

    return $target;

  }

}

const addCssClass = ($target, cssClass) => {

  let _target = checkIfMySelectorIsString($target);

  if(!_target.classList.contains(cssClass)) {

    _target.classList.add(cssClass);

  }

}

const removeCssClass = ($target, cssClass) => {

  let _target = checkIfMySelectorIsString($target);

  if(_target.classList.contains(cssClass)) {

    _target.classList.remove(cssClass);

  }

}

/*

  A função playUsingKeyboard recebe como parâmetro o valor de código
  de uma tecla pressionada. Verificando através dos casos cadastrados,
  onde para cada caso, a função retorna um valor associado a tecla ou
  retorna falso, caso a tecla pressionada não corresponda a nenhum dos
  casos.

*/
const playUsingKeyboard = (playWhat) => {

  switch (playWhat) {

    case 'KeyQ':
      return 'pom';

    case 'KeyW':
      return 'clap';

    case 'KeyE':
      return 'tim';

    case 'KeyA':
      return 'puff';

    case 'KeyS':
      return 'splash';

    case 'KeyD':
      return 'toim';

    case 'KeyZ':
      return 'psh';

    case 'KeyX':
      return 'tic';

    case 'KeyC':
      return 'tom';

    default:
      return false;

  }

}

/*

  A função playSound recebe como parâmetro uma string para
  compor um seletor CSS, que é usado pela função $getMySelector
  para obter o valor de src do elemento para ser executada
  usando a HTML DOM API HTMLAudioElement. É possível reproduzir
  um som usando $getMySelector(_target).play(), especificamente
  neste caso irá causar um bug pelo comportamento que é esperado.

*/
const playSound = ($target) => {

  let _target = `#${$target}`;
  let audioPath = $getMySelector(_target).src;
  let audioFx = new Audio(audioPath);

  //$getMySelector(_target).play();
  audioFx.play();

}

/*

  A função aluramidi é uma função de um componente que utiliza as funções
  anteriores para compor suas ações. Nela são atribuídos eventos de click
  a botões e eventos de teclado para executar suas ações.

*/
const aluramidi = () => {

  const elementSelector = '.aluramidi';
  const myElement = $getMySelector(elementSelector);
  const triggerSelector = myElement.dataset.trigger;
  const myTriggers = $getMySelectors(elementSelector + ' ' + triggerSelector);

  for(let index = 0; index < myTriggers.length; index++) {

    myTriggers[index].addEventListener('click', () => {

      playSound(myTriggers[index].dataset.target);

    });

    myTriggers[index].addEventListener('keydown', (event) => {

      if(event.code === 'Enter' || event.code === 'Space') {

        addCssClass(myTriggers[index], 'ativa');

      }

    });

    myTriggers[index].addEventListener('keyup', (event) => {

      if(event.code === 'Enter' || event.code === 'Space') {

        removeCssClass(myTriggers[index], 'ativa');

      }

    });

  }

  window.addEventListener('keydown', (event) => {

    if(playUsingKeyboard(event.code)) {

      let targetAcquired =  playUsingKeyboard(event.code);

      addCssClass(`${elementSelector} .tecla[data-target="${targetAcquired}"]`, 'ativa');
      playSound(targetAcquired);

    }

  });

  window.addEventListener('keyup', (event) => {

    if(playUsingKeyboard(event.code)) {

      let targetAcquired =  playUsingKeyboard(event.code);

      removeCssClass(`${elementSelector} .tecla[data-target="${targetAcquired}"]`, 'ativa');

    }

  });

}

/*

  Este evento foi adicionado ao window e faz com que as funções
  em seu interior só sejam executadas após o load da página, evitando
  assim que o javascript faça interações com a página antes dela
  estar pronta para isso.

*/
window.addEventListener('load', () => {

  aluramidi();

});
