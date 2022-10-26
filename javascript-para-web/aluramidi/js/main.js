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

const playSound = ($target) => {

  let _target = `#${$target}`;
  let audioPath = $getMySelector(_target).src;
  let audioFx = new Audio(audioPath);

  //$getMySelector(_target).play();
  audioFx.play();

}

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

window.addEventListener('load', () => {

  aluramidi();

});
