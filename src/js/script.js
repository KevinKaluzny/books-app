function renderBooks() {
    for (let data in dataSource.books) {
        const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    }
}

renderBooks();