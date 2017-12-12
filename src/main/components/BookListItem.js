import React from 'react'
import PropTypes from 'prop-types'
import BookShelfSelector from './BookShelfSelector'
/**
 * This stateless function represent a book item component.
 * @module components/BookListItem
 * @author EvanFung <evanfungv@gmail.com>
 * @version     1.0
 * @param       {[object]} props [Component props]
 * @param       {[array]} props.books [List of books to display on different shelf]
 * @param       {[function]} props.onShelfChange [Handler function to trigger when a book is moved to another shelf]
 */
function BookListItem(props) {
  const book = props.book
  /**
   * Formatted author string
   * @author EvanFung <evanfungv@gmail.com>
   * @version 1.0
   * @return  {[array]} [formatted array of book authors]
   */
  let getAuthorsString = () => {
    return book.authors ? book.authors.join(', ') : 'Unknown'
  }
  let isImageAvailable = () => {
    return book.imageLinks && book.imageLinks.thumbnail
  }
  return (
    <div className="book">
      <div className="book-top">
        {isImageAvailable() ? (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
        ) : (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url('../../images/no-image.svg')`
            }}
          />
        )}
        <BookShelfSelector book={book} onShelfChange={props.onShelfChange} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{getAuthorsString()}</div>
    </div>
  )
}
BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}
export default BookListItem
