const favoriteBooks = [];
const filters = [];

function renderBooks() {
  for (let data in dataSource.books) {
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
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
  
}