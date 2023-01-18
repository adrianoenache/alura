/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, $getMySelectors, createElementFromTemplateOnTarget, onTargetEventDoAction } from './common-functions.js';

let books = [];
const apiBooks = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const targetToInsertTheBooks = $getMySelector('#livros');
const discountLimitRule = 20;
const discountValue = 0.3;
const filterButtons = $getMySelectors('.filter');
let booksFiltered = [];

export function startAluraBooks() {

  pullDataOfBooksFromApi();

}

async function pullDataOfBooksFromApi() {

  const response = await fetch(apiBooks);

  books = await response.json();

  const booksWithDiscountApplied = applyDiscountInTheBooks(books);

  insertBooksInPlace(booksWithDiscountApplied);

  filterBooksby(books);

}

function insertBooksInPlace(dataOfTheBooks, doWhat = 'add') {

  if(doWhat === 'replace') {

    targetToInsertTheBooks.innerHTML = '';

  }

  dataOfTheBooks.forEach(book => {

    let bookIsntAvailable = book.quantidade == 0 ? 'indisponivel' : '';

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

function filterBooksby(books) {

  if(!books) return;

  filterButtons.forEach(filterbutton => {

    onTargetEventDoAction(filterbutton, 'click', () => {

      if(filterbutton.value === 'show-all') {

        booksFiltered = books;

        insertBooksInPlace(booksFiltered, 'replace');

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
