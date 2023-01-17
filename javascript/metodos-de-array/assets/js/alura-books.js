/*

  Para os imports funcionem, é necessário que no HTML onde é importado
  o arquivo "app.js", o parâmetro "type" tenha o valor "module".

*/
import { $getMySelector, createElementFromTemplateOnTarget } from './common-functions.js';

let books = [];
const apiBooks = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
const targetToInsertTheBooks = $getMySelector('#livros');

console.log('targetToInsertTheBooks', targetToInsertTheBooks);

export function startAluraBooks() {

  pullDataOfBooksFromApi();

}

async function pullDataOfBooksFromApi() {

  const response = await fetch(apiBooks);

  books = await response.json();

  console.log('### books = ', books);
  console.table(books);

  insertBooksInPlace(books);

}

function insertBooksInPlace(dataOfTheBooks) {

  dataOfTheBooks.forEach(book => {

    let template = `
    <div class="livro">
      <img class="livro__imagens" src="${book.imagem}" alt="${book.alt}" />
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
