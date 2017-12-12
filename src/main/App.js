import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'
import BookList from './components/BookList'
import BookSearch from './components/BookSearch'
import * as BooksAPI from './utils/BooksAPI'
import '../res/styles/App.css'
/**
 * Main components of the application.
 * @module BooksApp
 * @author EvanFung <evanfungv@gmail.com>
 * @extends React
 */
class BooksApp extends React.Component {
  state = {
    books: []
  }
  /**
   * Get the shelf name to determin the book belongs to which shelf
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[string]} bookId [book's id]
   * @return  {[string]}        [Name of the shelf of foundBook]
   */
  getBookShelf = bookId => {
    let foundBook = this.state.books.find(book => book.id === bookId)
    return foundBook ? foundBook.shelf : 'none'
  }
  /**
   * Update the state of books when moved the book to another shelf
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[object]} book [the book that need to move to a new shelf]
   */
  updateBookStatus = book => {
    const books = this.state.books
    const bookIndex = books.findIndex(item => item.id === book.id)

    if (bookIndex !== -1) {
      if (book.shelf === 'none') {
        console.log(`"${book.title}" removed from shelves`)
        books.splice(bookIndex, 1)
      } else {
        console.log(`"${book.title}" moved to shelf "${book.shelf}"`)
        books[bookIndex] = book
      }
    } else {
      console.log(`"${book.title}" added to shelf "${book.shelf}"`)
      books.push(book)
    }
    this.setState({ books })
  }
  /**
   * Moves a book to new shelf by calling the BooksAPI's update method
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[object]} book  [the book that need to move to a new shelf]
   * @param   {[type]} shelf [name of the shelf]
   */
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.updateBookStatus(book)
    })
  }
  /**
   * This will be triggered once the component is inserted in the DOM, and we'll fetch the data on current user book shelf
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // console.log(books)
      this.setState({ books })
    })
  }
  /**
   * Return a React.createDOM() object
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @return  {[JSX template]}
   */
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <main>
            {/* index page */}
            <Route
              path="/"
              exact
              render={({ location, history }) => (
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
              render={({ match, history }) => (
                <BookSearch
                  onShelfChange={this.updateBookShelf}
                  getBookShelf={this.getBookShelf}
                />
              )}
            />
          </main>
        </div>
      </div>
    )
  }
}

export default BooksApp
