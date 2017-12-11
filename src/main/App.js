import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import * as BooksAPI from './utils/BooksAPI';
import '../res/styles/App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  };

  getBookShelf = bookId => {
    let foundBook = this.state.books.find(book => book.id === bookId);
    return foundBook ? foundBook.shelf : 'none';
  };

  updateBookStatus = book => {
    const books = this.state.books;
    const bookIndex = books.findIndex(item => item.id === book.id);

    if (bookIndex !== -1) {
      if (book.shelf === 'none') {
        console.log(`"${book.title}" removed from shelves`);
        books.splice(bookIndex, 1);
      } else {
        console.log(`"${book.title}" moved to shelf "${book.shelf}"`);
        books[bookIndex] = book;
      }
    } else {
      console.log(`"${book.title}" added to shelf "${book.shelf}"`);
      books.push(book);
    }
    this.setState({ books });
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.updateBookStatus(book);
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // console.log(books)
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <main>
            <Route
              path="/"
              exact
              render={location => (
                <div>
                  <Header currentPath={location} />
                  <BookList
                    books={this.state.books}
                    onShelfChange={this.updateBookShelf}
                  />
                </div>
              )}
            />
            {/* Search books page */}
            <Route
              path="/search/"
              render={({ match }) => (
                <BookSearch
                  onShelfChange={this.updateBookShelf}
                  getBookShelf={this.getBookShelf}
                />
              )}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default BooksApp;
