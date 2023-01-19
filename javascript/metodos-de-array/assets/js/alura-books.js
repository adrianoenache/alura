/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, $getMySelectors, createElementFromTemplateOnTarget, onTargetEventDoAction } from './common-functions.js';

let books = [];
let booksFiltered = [];

const apiBooks = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const targetToInsertTheBooks = $getMySelector('#livros');
const filterControllers = $getMySelector('#filter-controllers');
const filterButtons = $getMySelectors('.filter');
const sortBy = $getMySelectors('.sort-by');
const removeSort = $getMySelector('#remove-sort');

const discountLimitRule = 20;
const discountValue = 0.3;

let sortDirecton = '';

export function startAluraBooks() {

  pullDataOfBooksFromApi();

  btnsSortBy(sortBy);

  btnRemoveSort();

}

async function pullDataOfBooksFromApi() {

  const response = await fetch(apiBooks);

  books = await response.json();

  booksFiltered = books;

  const booksWithDiscountApplied = applyDiscountInTheBooks(books);

  insertBooksInPlace(booksWithDiscountApplied);

  filterBooksby(booksFiltered);

}

function insertBooksInPlace(dataOfTheBooks, doWhat = 'add') {

  if(doWhat === 'replace') {

    targetToInsertTheBooks.innerHTML = '';

  }

  dataOfTheBooks.forEach(book => {

    let bookIsntAvailable = book.quantidade <= 0 ? 'indisponivel' : '';

    let template = `
    <div class="livro">
      <img class="livro__imagens ${bookIsntAvailable}" src="${book.imagem}" alt="${book.alt}" />
      <h2 class="livro__titulo">
        ${book.titulo}
      </h2>
      <p class="livro__descricao">
        ${book.alt}
      </p>
      <p class="livro__preco" id="preco">
        R$${book.preco}
      </p>
      <div class="tags">
        <span class="tag">
          ${book.categoria}
        </span>
      </div>
    </div>
    `;

    createElementFromTemplateOnTarget(targetToInsertTheBooks, template);

  });

}

function applyDiscountInTheBooks(books) {

  const booksWithDiscount = books.map(book => {

    return {
      ...book,
      preco: book.preco >= discountLimitRule ? (book.preco - (book.preco * discountValue)).toFixed(2) : book.preco
    }

  });

  return booksWithDiscount;

}

function resetBooksList() {

  booksFiltered = books;

  insertBooksInPlace(booksFiltered, 'replace');

}

function filterBooksby(books) {

  if(!books) return;

  filterButtons.forEach(filterbutton => {

    onTargetEventDoAction(filterbutton, 'click', () => {

      if(filterbutton.value === 'show-all') {

        resetBooksList();

      } else {

        if(filterbutton.value === 'available') {

          booksFiltered = booksFiltered.filter(book => book.quantidade !== 0);

        } else {

          booksFiltered = books.filter(book => book.categoria == filterbutton.value);
        }

        insertBooksInPlace(booksFiltered, 'replace');

      }

    })

  });

}

function sortBooks(sortBooks, by, direction) {

  if(direction === 'ascending') {

    if(by === 'preco') {

      return sortBooks.sort((bookA, bookB) => bookA[by] - bookB[by]);

    }

    if(by === 'titulo') {

      return sortBooks.sort((bookA, bookB) => {

        if (bookA[by] < bookB[by]) {

          return -1;

        }


        if (bookA[by] > bookB[by]) {

          return 1;

        }

        return 0;

      });

    }

  }

  if(direction === 'descending') {

    if(by === 'preco') {

      return sortBooks.sort((bookA, bookB) => bookA[by] - bookB[by]).reverse();

    }

    if(by === 'titulo') {

      return sortBooks.sort((bookA, bookB) => {

        if (bookA[by] < bookB[by]) {

          return -1;

        }


        if (bookA[by] > bookB[by]) {

          return 1;

        }

        return 0;

      }).reverse();

    }

  }

}

function checkForAscendingOrDescending(ascending = false) {

  if(ascending) {

    if(filterControllers.classList.contains("put-in-descending-order")) {

      filterControllers.classList.remove("put-in-descending-order");
      filterControllers.classList.add("put-in-ascending-order");

      //console.log("add remove class");

      return 'ascending';

    } else if(filterControllers.classList.contains("put-in-ascending-order")) {

      //console.log("just confirm");

      return 'ascending';

    }

  }

  if(filterControllers.classList.contains("put-in-ascending-order")) {

    filterControllers.classList.remove("put-in-ascending-order");
    filterControllers.classList.add("put-in-descending-order");

    return 'descending';

  } else if(filterControllers.classList.contains("put-in-descending-order")) {

    filterControllers.classList.remove("put-in-descending-order");
    filterControllers.classList.add("put-in-ascending-order");

    return 'ascending';

  }

}

function btnsSortBy(buttons) {

  buttons.forEach(button => {

    onTargetEventDoAction(button, 'click', () => {

      let IAm = button.value;
      let whoAmI = '';
      let whoAmINot = '';

      whoAmI = `sort-by-${IAm}`;

      if(IAm === 'preco') {

        whoAmINot = "sort-by-titulo";

      } else if(IAm === 'titulo') {

        whoAmINot = "sort-by-preco";

      }

      if(!filterControllers.classList.contains("sort-by-preco") && !filterControllers.classList.contains("sort-by-titulo")) {

        filterControllers.classList.add(`sort-by-${button.value}`);

        if(!filterControllers.classList.contains("put-in-ascending-order") && !filterControllers.classList.contains("put-in-descending-order")) {

          filterControllers.classList.add("put-in-ascending-order");

          sortDirecton = checkForAscendingOrDescending(true);

          booksFiltered = sortBooks(booksFiltered, IAm, sortDirecton);


          insertBooksInPlace(booksFiltered, 'replace');

          //console.log(`First contact is ${sortDirecton}`);

        }

        return;

      }

      if(filterControllers.classList.contains(whoAmINot)) {

        filterControllers.classList.remove(whoAmINot);
        filterControllers.classList.add(whoAmI);

        sortDirecton = checkForAscendingOrDescending(true);

        booksFiltered = sortBooks(booksFiltered, IAm, sortDirecton);

        insertBooksInPlace(booksFiltered, 'replace');

        //console.log(`I am ${sortDirecton}`);

      } else {

        sortDirecton = checkForAscendingOrDescending();

        booksFiltered = sortBooks(booksFiltered, IAm, sortDirecton);

        insertBooksInPlace(booksFiltered, 'replace');

        //console.log(`I am ${sortDirecton}`);

      }

    });

  });

}

function btnRemoveSort() {

  onTargetEventDoAction(removeSort, 'click', () => {

    if(filterControllers.classList.contains("sort-by-preco")) filterControllers.classList.remove("sort-by-preco");
    if(filterControllers.classList.contains("sort-by-titulo")) filterControllers.classList.remove("sort-by-titulo");
    if(filterControllers.classList.contains("put-in-ascending-order")) filterControllers.classList.remove("put-in-ascending-order");
    if(filterControllers.classList.contains("put-in-descending-order")) filterControllers.classList.remove("put-in-descending-order");

    sortDirecton = '';

    resetBooksList();

  });

}

