import React from 'react'
import BookListItem from './BookListItem'

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

export default BookShelf
