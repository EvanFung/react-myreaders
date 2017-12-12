import React from 'react'
import BookListItem from './BookListItem'
import PropTypes from 'prop-types'
/**
 * @module components/BookShelf
 * @author EvanFung <evanfungv@gmail.com>
 * @version     1.0
 * @param       {[object]} props [Component props]
 * @param       {[array]} props.books [List of books to display on different shelf]
 * @param       {[function]} props.onShelfChange [Handler function to trigger when a book is moved to another shelf]
 */
function BookShelf(props) {
  const books = props.books
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <BookListItem
                book={book}
                key={book.id}
                onShelfChange={props.onShelfChange}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired
}
export default BookShelf
