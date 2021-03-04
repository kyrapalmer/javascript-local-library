// Note: Please do not change the name of the functions. The tests use those names to validate your code.

//returns the author object associated with the input ID
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);;
}

//returns the book object associated with the input ID
function findBookById(books, id) {
  return books.find((book) => book.id === id);;
}

//returns a single array comprised of two arrays within--one holds all active borrows, one holds all returned books
function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let returnedBooks = [];
  for (book in books) {
    let theBook = books[book]
    theBook.borrows[0].returned ? returnedBooks.push(theBook) : borrowedBooks.push(theBook);
  }
  return [borrowedBooks, returnedBooks];
}

//returns an array of all accounts that have borrowed a book-limiting the list to 10 items
function getBorrowersForBook(book, accounts) {
    return book.borrows.map((transaction) => {
        let acctPair = accounts.find((acct) => acct.id === transaction.id);
        let combine = { ...transaction, ...acctPair };
        return combine;
      }).slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
