import React from 'react'
import PropTypes from 'prop-types'

function BookShelfSelector(props) {
  const book = props.book

  let changeBookShelf = event => {
    const shelf = event.target.value
    props.onShelfChange(book, shelf)
  }
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'none'} onChange={changeBookShelf}>
        <option value="none" disabled>
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
