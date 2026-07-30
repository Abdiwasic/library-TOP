const myLibrary = [];
const bookContainer = document.querySelector(".book-shelf");
const modal = document.getElementById("new-book-modal");
const newBookBtn = document.getElementById("new-book-btn");
const addButton = document.getElementById("submit-book-btn");
const titleNode = document.getElementById("title");
const authorNode = document.getElementById("author");
const pagesNode = document.getElementById("pages");
const readNode = document.getElementById("read");

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = `${pages} pages`;
  this.read = read;
}
Book.prototype.toggleRead = function () {
  this.read = this.read ? !this.read : (this.read = true);
};

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);
}

function displayBook() {
  const fragment = document.createDocumentFragment();

  bookContainer.innerHTML = "";
  for (const book of myLibrary) {
    const card = document.createElement("article");
    card.setAttribute("data-id", book.id);
    card.classList.add("book-card");

    const hole = document.createElement("span");
    hole.classList.add("book-card__hole");

    const cardBody = document.createElement("div");
    cardBody.classList.add("book-card__body");

    const h3El = document.createElement("h3");
    h3El.classList.add("book-card__title");
    h3El.textContent = book.title;

    const pEl = document.createElement("p");
    pEl.classList.add("book-card__author");
    pEl.textContent = book.author;

    const spanEl = document.createElement("span");
    spanEl.classList.add("book-card__pages");
    spanEl.textContent = book.pages;

    cardBody.append(h3El, pEl, spanEl);

    const bookCardStubEl = document.createElement("div");
    bookCardStubEl.classList.add("book-card__stub");

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-toggle");

    if (book.read) {
      readBtn.classList.add("is-read");
      readBtn.textContent = "Read";
    } else {
      readBtn.textContent = "Not read";
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.setAttribute("aria-label", "Remove book");
    removeBtn.textContent = "✕";

    bookCardStubEl.append(readBtn, removeBtn);

    card.append(hole, cardBody, bookCardStubEl);
    fragment.append(card);
  }
  removeBtn = document.querySelector(".remove-btn");
  bookContainer.append(fragment);
}

function handleAddBtn() {
  if (
    titleNode.value === "" ||
    authorNode.value === "" ||
    pagesNode.value === ""
  )
    return;
  addBookToLibrary(
    titleNode.value,
    authorNode.value,
    pagesNode.value,
    readNode.checked,
  );

  displayBook();
  titleNode.value = "";
  authorNode.value = "";
  pagesNode.value = "";
  readNode.value = readNode.checked = false;
  modal.close();
}

function handleReadStatusBtn(e) {
  if (!e.target.classList.contains("read-toggle")) return;

  const card = e.target.closest(".book-card");
  const bookId = card.dataset.id;

  const book = myLibrary.find((book) => book.id === bookId);

  book.toggleRead();
  displayBook();
}

function handleRemoveBtn(e) {
  const target = e.target;
  if (!e.target.classList.contains("remove-btn")) return;

  const card = target.closest(".book-card");
  const bookId = card.dataset.id;

  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(bookIndex, 1);

  displayBook();
}

newBookBtn.addEventListener("click", () => modal.showModal());
addButton.addEventListener("click", handleAddBtn);
bookContainer.addEventListener("click", handleReadStatusBtn);
bookContainer.addEventListener("click", handleRemoveBtn);
