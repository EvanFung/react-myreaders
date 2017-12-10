import React from 'react'
import { Route, Link } from 'react-router-dom'
import Header from './components/Header'
import BookList from './components/BookList'
import BookSearch from './components/BookSearch'
import * as BooksAPI from './utils/BooksAPI'
import '../res/styles/App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

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

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.updateBookStatus(book)
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // console.log(books)
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <Route
            exact
            path="/"
            render={({ location }) => <Header currentPath={location} />}
          />
          <main>
            <Route
              path="/"
              exact
              render={() => (
                <BookList
                  books={this.state.books}
                  onShelfChange={this.updateBookShelf}
                />
              )}
            />
            <Route path="/search/" render={match => <BookSearch />} />
          </main>
          <div className="open-search">
            <Link to="/search">Add A book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
