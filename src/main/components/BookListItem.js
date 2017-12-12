import React from 'react'
import PropTypes from 'prop-types'
import BookShelfSelector from './BookShelfSelector'

function BookListItem(props) {
  const book = props.book
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
          <div className="book-cover">
            <span className="no-image" />
          </div>
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
