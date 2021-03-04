// Note: Please do not change the name of the functions. The tests use those names to validate your code.

//returns an account based on the input ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);;
}

//returns the input accounts array, ordered by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1 );
}

//returns the total amount of times an account has borrowed from the library
function getTotalNumberOfBorrows(account, books) {
   let found = books.filter((book) => {return book.borrows.some((checkout) => checkout.id === account.id);});
   return found.length;
}

//returns an array of all books being borrowed by an account w/ the author info as well
function getBooksPossessedByAccount(account, books, authors) {
  let result = books.filter(({ borrows }) => (borrows[0].id === account.id && !borrows[0].returned)).map((book) => {
    let author = authors.find((auth) => auth.id === book.authorId);
    return {...book, author};
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
