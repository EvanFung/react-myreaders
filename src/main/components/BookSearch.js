import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookListItem from './BookListItem'
/**
 * This component is the book search page.
 * @module components/BookSearch
 * @author EvanFung <evanfungv@gmail.com>
 * @version     1.0
 * @param       {[object]} props [Component props]
 * @param       {[function]} props.onShelfChange [Handler function to trigger when a book is moved to another shelf]
 */
class BookSearch extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
  }
  /**
   *  component state
   * @type {string} query [search bar query string]
   * @type {array} results [results of the query]
   */
  state = {
    query: '',
    results: []
  }
  /**
   * Updates the value of the query in the component's state.
   * If the value is not a valid term, we dont perform the BooksAPI.search
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[string]} query [query string]
   */
  updateQuery = query => {
    this.setState({ query: query })
    BooksAPI.isValidQueryStr(query.trim())
      ? this.handleBookSearch(query.trim())
      : this.setState({ results: [] })
  }
  /**
   * Calls the search method of the Books API to retrieve the list of books
   * and loop through the results to make the book object to get shelf arrtribute.
   * This is because results fetch from BooksAPI.search() has no shelf property
   * But the results fetch from BooksAPI.getAll() includes the shelf property.
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[type]} query [description]
   */
  handleBookSearch = query => {
    BooksAPI.search(query, 20).then(results => {
      if (results !== undefined && results.length > 0) {
        let bookOnShelves = results.map(book => {
          book.shelf = this.props.getBookShelf(book.id)
          return book
        })
        this.setState({ results: bookOnShelves })
      }
    })
  }

  render() {
    const { query, results } = this.state
    const { onShelfChange } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => {
                this.updateQuery(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query &&
            results !== undefined &&
            (results.length === 0 ? (
              <p>
                No results found for <em>"{query}"</em>
              </p>
            ) : (
              <p>
                Showing {results.length} books for <em>"{query}"</em>
              </p>
            ))}
          <ol className="books-grid">
            {results !== undefined &&
              results.length > 0 &&
              query !== '' &&
              results.map(book => (
                <li key={book.id}>
                  <BookListItem
                    key={book.id}
                    onShelfChange={onShelfChange}
                    book={book}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
