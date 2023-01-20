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

let statusOfFilterSortDirection = '';
let statusOfFilterSortByType = '';
let statusOfFilterSortByCategory = '';
let statusOfFilterSortByAvailable = '';

export function startAluraBooks() {

  pullDataOfBooksFromApi();

  btnsSortBy(sortBy);

  btnRemoveFilters();

}

async function pullDataOfBooksFromApi() {

  const response = await fetch(apiBooks);

  books = await response.json();

  booksFiltered = books;

  const booksWithDiscountApplied = applyDiscountInTheBooks(books);

  insertBooksInPlace(booksWithDiscountApplied);

  filterBooksby(booksFiltered);

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

function resetBooksList() {

  booksFiltered = books;

  insertBooksInPlace(booksFiltered, 'replace');

}

function filterBooksby(books) {

  if(!books) return;

  filterButtons.forEach(filterbutton => {

    onTargetEventDoAction(filterbutton, 'click', () => {

      statusOfFilterSortByCategory = filterbutton.value;

      if(statusOfFilterSortByCategory === 'show-all') {

        statusOfFilterSortByAvailable = '';

        resetBooksList();

      } else {

        if(statusOfFilterSortByCategory === 'available') {

          statusOfFilterSortByAvailable = 'available';

          booksFiltered = filterByAvailable(booksFiltered);

        } else {

          booksFiltered = filterByCategory(books);

          booksFiltered = filterByAvailable(booksFiltered);

          booksFiltered = sortBooks(booksFiltered);

        }

        insertBooksInPlace(booksFiltered, 'replace');

      }

    })

  });

}

function filterByAvailable(books) {

  if(statusOfFilterSortByAvailable === 'available') {

    return books.filter(book => book.quantidade > 0);

  } else {

    return books;

  }

}

function filterByCategory(books) {

  return  books.filter(book => book.categoria == statusOfFilterSortByCategory);

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

function sortBooks(sortBooks) {


  if(statusOfFilterSortByType && statusOfFilterSortDirection) {

    let by = statusOfFilterSortByType;
    let direction = statusOfFilterSortDirection

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

  } else {

    return sortBooks;

  }

}

function btnsSortBy(buttons) {

  buttons.forEach(button => {

    onTargetEventDoAction(button, 'click', () => {

      let IAm = button.value;
      let whoAmI = '';
      let whoAmINot = '';

      statusOfFilterSortByType = IAm;

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

          statusOfFilterSortDirection = checkForAscendingOrDescending(true);

          booksFiltered = sortBooks(booksFiltered);


          insertBooksInPlace(booksFiltered, 'replace');

          //console.log(`First contact is ${statusOfFilterSortDirection}`);

        }

        return;

      }

      if(filterControllers.classList.contains(whoAmINot)) {

        filterControllers.classList.remove(whoAmINot);
        filterControllers.classList.add(whoAmI);

        statusOfFilterSortDirection = checkForAscendingOrDescending(true);

        booksFiltered = sortBooks(booksFiltered);

        insertBooksInPlace(booksFiltered, 'replace');

        //console.log(`I am ${statusOfFilterSortDirection}`);

      } else {

        statusOfFilterSortDirection = checkForAscendingOrDescending();

        booksFiltered = sortBooks(booksFiltered);

        insertBooksInPlace(booksFiltered, 'replace');

        //console.log(`I am ${statusOfFilterSortDirection}`);

      }

    });

  });

}

function btnRemoveFilters() {

  onTargetEventDoAction(removeSort, 'click', () => {

    if(filterControllers.classList.contains("sort-by-preco")) filterControllers.classList.remove("sort-by-preco");
    if(filterControllers.classList.contains("sort-by-titulo")) filterControllers.classList.remove("sort-by-titulo");
    if(filterControllers.classList.contains("put-in-ascending-order")) filterControllers.classList.remove("put-in-ascending-order");
    if(filterControllers.classList.contains("put-in-descending-order")) filterControllers.classList.remove("put-in-descending-order");

    statusOfFilterSortByAvailable = '';
    statusOfFilterSortDirection = '';
    statusOfFilterSortByType = '';
    statusOfFilterSortByCategory = '';

    resetBooksList();

  });

}
