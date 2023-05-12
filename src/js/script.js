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
    
}

initActions();