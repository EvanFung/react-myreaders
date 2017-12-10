import React from 'react'
import BookShelf from './BookShelf'

function BookList(props) {
  const shelves = [
    { id: 'currentlyReading', name: 'Currently Reading' },
    { id: 'wantToRead', name: ' Want to Read' },
    { id: 'read', name: ' Read' }
  ]

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
      </div>
    </div>
  )
}

export default BookList
