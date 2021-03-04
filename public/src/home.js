// Note: Please do not change the name of the functions. The tests use those names to validate your code.

//returns total number of books
function getTotalBooksCount(books) {
  return books.length;
}

//returns total number of accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//returns total number of books currently being borrowed
function getBooksBorrowedCount(books) {
  let result = books.filter((book) => {
    return book.borrows.some((thing) => thing.returned === false);
  });
  return result.length;
}

//returns an ordered list of most common genres-limited to top 5-from an array of book objects
function getMostCommonGenres(books) {
  let result = []; 
  let finalObject = {};
  for (let i = 0; i < books.length; i++) {
    if (books[i].genre in finalObject) {
      finalObject[books[i].genre] = finalObject[books[i].genre] + 1
    } else {
      finalObject[books[i].genre] = 1;
    }
  }
  Object.keys(finalObject).map((key) => result.push({name: key, count: finalObject[key]}))
  return result.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}

//returns an ordered list of most popular books-limiting that list to 5 items
function getMostPopularBooks(books) {
  let result = [];
  for (let i = 0; i < books.length; i++) {
    result.push({ name: books[i].title, count: books[i].borrows.length });
  }
  return result.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}


//returns an ordered list of most popular authors (authors with total most borrows)-limiting list to 5 items
function getMostPopularAuthors(books, authors) {
  //helper function to find total number of borrows by author
  function borrowTotal(author) {
    return books.reduce((acc, book) => {
      const { borrows } = book;
      if (book.authorId === author) {
        acc += borrows.length;
        return acc;
      } else {
        return acc;
      }
    }, 0);
  }
  
  let counter = 0;
  let authorArray = books.reduce((acc, book) => {
        const { authorId } = book;
    let count = borrowTotal(authorId);
    let authorName = authors.find((author) => author.id === authorId);
    const {
      name: { first },
      name: { last },
    } = authorName;
    if (acc.some((entry) => entry.name === `${first} ${last}`)) return acc;
    acc[counter] = { name: `${first} ${last}`, count: count };
    counter++;
    return acc;
  }, []);

  let result = authorArray.sort((authorA, authorB) =>
    authorA.count > authorB.count ? -1 : 1
  );
  while (result.length > 5) result.pop();
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
