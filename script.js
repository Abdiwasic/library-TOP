const libraryContainerEl = document.querySelector(".library");
const newBookBtn = document.querySelector("#newBookBtn");
const dialogEl = document.querySelector("dialog");
const userValues = document.querySelectorAll("div > input, #read");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const myLibrary = [];

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}
Book.prototype.toggleRead = function () {
  this.read = this.read === "Yes" ? "No" : "Yes";
};
function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("NEVER SPLIT THE DIFFERENCE", "Chris Voss", 285, "No");
addBookToLibrary(
  "How To Win Friends And Influence People",
  "Dale Carnegie",
  315,
  "Yes",
);

function displayEachBook() {
  libraryContainerEl.innerHTML = "";
  for (const book of myLibrary) {
    const bookEl = `
        <div class="card" data-id="${book.id}">
            <h3>${book.title}</h3>
            <p>Author: <strong>${book.author}</strong></p>
            <p>Pages: ${book.pages}</p>
            
            <p><button type="button" class="read-status-toggle">Read</button> = ${book.read}</p>
            <button type="button" class="remove">Remove</button>
        </div>
    `;
    libraryContainerEl.insertAdjacentHTML("beforeend", bookEl);
  }
}

function handleAddBook(e) {
  e.preventDefault();
  const [titleNode, authorNode, pagesNode, readNode] = userValues;
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
    readNode.value,
  );
  displayEachBook();
  titleNode.value = "";
  authorNode.value = "";
  pagesNode.value = "";
  dialogEl.close();
}

function handleBookReadStatus(e) {
  e.preventDefault();
  if (!e.target.classList.contains("read-status-toggle")) return;

  const cardEl = e.target.closest(".card");
  const bookId = cardEl.dataset.id;
  const book = myLibrary.find((book) => book.id === bookId);

  book.toggleRead();

  displayEachBook();
}

function handleRemoveBook(e) {
  if (!e.target.classList.contains("remove")) return;

  const cardEl = e.target.closest(".card");
  const bookId = cardEl.dataset.id;

  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(bookIndex, 1);

  cardEl.remove();
}

newBookBtn.addEventListener("click", () => {
  dialogEl.showModal();
});

addBtn.addEventListener("click", handleAddBook);

displayEachBook();

libraryContainerEl.addEventListener("click", handleRemoveBook);
libraryContainerEl.addEventListener("click", handleBookReadStatus);
