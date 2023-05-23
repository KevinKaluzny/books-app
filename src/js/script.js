class BooksList {
  constructor(dataSource) {
    this.dataSource = dataSource;

    this.dom = {};
    this.favoriteBooks = [];
    this.filters = [];

    this.renderBooks();
    this.getElements();
    this.initActions();
  }

  renderBooks() {
    for (let data in this.dataSource.books) {
      const ratingBgc = this.determineRatingBgc(this.dataSource.books[data].rating);
      const ratingWidth = this.dataSource.books[data].rating * 10;
      const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      const combinedData = this.dataSource.books[data];
      combinedData.ratingBgc = ratingBgc;
      combinedData.ratingWidth = ratingWidth;
      const html = template(combinedData);
      this.dom.element = utils.createDOMFromHTML(html);
      const booksList = document.querySelector('.books-list');
      booksList.innerHTML += html;
    }
  }

  getElements() {
    this.dom.booksList = document.querySelector('.books-list');
    this.dom.form = document.querySelector('.filters');
    this.dom.books = this.dom.booksList.querySelectorAll('.book__image');
  }

  initActions() {
    const thisBooksList = this;

    this.dom.booksList.addEventListener('click', function (event) {
      event.preventDefault();
    });
    this.dom.booksList.addEventListener('dblclick', function (event) {
      if (event.target.offsetParent.classList.contains('book__image')) {
        const id = event.target.offsetParent.getAttribute('data-id');

        if (thisBooksList.favoriteBooks.includes(id)) {
          event.target.offsetParent.classList.remove('favorite');
          const index = thisBooksList.favoriteBooks.indexOf(id);
          thisBooksList.favoriteBooks.splice(index, 1);
        } else {
          event.target.offsetParent.classList.add('favorite');
          thisBooksList.favoriteBooks.push(id);
        }
      }
    });
    this.dom.form.addEventListener('change', function (event) {
      const clickedElem = event.target;

      if (clickedElem.tagName == 'INPUT' && clickedElem.getAttribute('type') && clickedElem.getAttribute('name')) {
        const value = clickedElem.getAttribute('value');

        if (clickedElem.checked == true) {
          thisBooksList.filters.push(value);
        } else {
          const indexOf = thisBooksList.filters.indexOf(value);
          thisBooksList.filters.splice(indexOf, 1);
        }
      }

      thisBooksList.filterBooks();
    });
  }

  filterBooks() {
    for (let book of this.dom.books) {
      const dataId = book.getAttribute('data-id');
      const adults = dataSource.books[dataId - 1].details.adults;
      const nonFiction = dataSource.books[dataId - 1].details.nonFiction;

      if ((this.filters.includes('adults') && !adults) || (this.filters.includes('nonFiction') && !nonFiction)) {
        book.classList.add('hidden');
      } else {
        book.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
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
}

const app = new BooksList(dataSource);