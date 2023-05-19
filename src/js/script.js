const favoriteBooks = [];
const filters = [];

function renderBooks() {
  for (let data in dataSource.books) {
    const ratingBgc = determineRatingBgc(dataSource.books[data].rating);
    const ratingWidth = dataSource.books[data].rating * 10;
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const combinedData = dataSource.books[data];
    combinedData.ratingBgc = ratingBgc;
    combinedData.ratingWidth = ratingWidth;
    console.log(combinedData);
    const html = template(dataSource.books[data]);
    const booksList = document.querySelector('.books-list');
    booksList.innerHTML += html;
  }
}

renderBooks();

function initActions() {
  const booksList = document.querySelector('.books-list');
  const form = document.querySelector('.filters');

  booksList.addEventListener('click', function (event) {
    event.preventDefault();
  });
  booksList.addEventListener('dblclick', function (event) {
    if (event.target.offsetParent.classList.contains('book__image')) {
      const id = event.target.offsetParent.getAttribute('data-id');

      if (favoriteBooks.includes(id)) {
        event.target.offsetParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(id);
        favoriteBooks.splice(index, 1);
      } else {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(id);
      }
    }
  });
  form.addEventListener('change', function(event) {
    const clickedElem = event.target;

    if (clickedElem.tagName == 'INPUT' && clickedElem.getAttribute('type') && clickedElem.getAttribute('name')) {
      const value = clickedElem.getAttribute('value');

      if (clickedElem.checked == true) {
        filters.push(value);
      } else {
        const indexOf = filters.indexOf(value);
        filters.splice(indexOf, 1);
      }
    }

    filterBooks();
  });
}

initActions();

function filterBooks() {
  const booksList = document.querySelector('.books-list');
  const books = booksList.querySelectorAll('.book__image');

  for (let book of books) {
    const dataId = book.getAttribute('data-id');
    const adults = dataSource.books[dataId - 1].details.adults;
    const nonFiction = dataSource.books[dataId - 1].details.nonFiction;

    if ((filters.includes('adults') && !adults) || (filters.includes('nonFiction') && !nonFiction)) {
      book.classList.add('hidden');
    } else {
      book.classList.remove('hidden');
    }
  }
}

function determineRatingBgc(rating) {
  let color1;
  let color2;

  if (rating < 6) {
    color1 = '#fefcea';
    color2 = '#f1da36';
  } else if (rating > 6 && rating <= 8) {
    color1 = '#b4df5b';
    color2 = '#b4df5b';
  } else if (rating > 8 && rating <= 9) {
    color1 = '#299a0b';
    color2 = '#299a0b';
  } else if (rating > 9) {
    color1 = '#ff0084';
    color2 = '#ff0084';
  }

  const ratingBgc = 'linear-gradient(to bottom, ' + color1 + ' 0%, ' + color2 + ' 100%);';

  return ratingBgc;
}