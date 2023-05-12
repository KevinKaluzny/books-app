const favoriteBooks = [];

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
    const bookImages = document.querySelectorAll('.book__image');

    for (let bookImage of bookImages) {
        bookImage.addEventListener('click', function(event) {
            event.preventDefault();
        })
        bookImage.addEventListener('dblclick', function() {
            this.classList.add('favorite');
            const id = this.getAttribute('data-id');
        });
    }
}

initActions();