import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
/**
 * This is a stateless component which is the user's book library.
 * It includes a set of shelves and the shelf has a group of book.
 * @module components/BookList
 * @author EvanFung <evanfungv@gmail.com>
 * @version     1.0
 * @param       {[object]} props [Component props]
 * @param       {[array]} props.books [List of books to display on different shelf]
 * @param       {[function]} props.onShelfChange [Handler function to trigger when a book is moved to another shelf]
 */
function BookList(props) {
  /**
   * a constant object, which will loop through to generate different book shelf component
   * @type {Array}
   */
  const shelves = [
    { id: 'currentlyReading', name: 'Currently Reading' },
    { id: 'wantToRead', name: 'Want to Read' },
    { id: 'read', name: 'Read' }
  ]
  /**
   * Get all of the user's book that belong to certain shelf
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @param   {[string]} shelf
   * @return  {[array]} books  [List of book which is certain shelf]
   */
  let getBookFromShelf = shelf => {
    return props.books.filter(book => {
      return book.shelf === shelf
    })
  }

  return (
    <div className="list-books-content">
      <div className="container">
        {shelves.map(shelf => (
          <BookShelf
            key={shelf.id}
            title={shelf.name}
            books={getBookFromShelf(shelf.id)}
            onShelfChange={props.onShelfChange}
          />
        ))}
        <div className="open-search">
          <Link to="/search/">Add A book</Link>
        </div>
      </div>
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookList
