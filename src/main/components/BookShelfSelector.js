import React from 'react'
import PropTypes from 'prop-types'
/**
 * @module components/BookShelfSelector
 * @author EvanFung <evanfungv@gmail.com>
 * @version     1.0
 * @param       {[object]} props [Component props]
 * @param       {[array]} props.books [List of books to display on different shelf]
 * @param       {[function]} props.onShelfChange [Handler function to trigger when a book is moved to another shelf]
 */
function BookShelfSelector(props) {
  const book = props.book

  let changeBookShelf = event => {
    const shelf = event.target.value
    props.onShelfChange(book, shelf)
  }
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'none'} onChange={changeBookShelf}>
        <option value="moveTo" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}
BookShelfSelector.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}
export default BookShelfSelector
