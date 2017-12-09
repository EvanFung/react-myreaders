import React from 'react'
import BookShelf from './BookShelf'

function BookList(props) {
  const shelves = [
    { id: '0', name: 'Currently Reading' },
    { id: '1', name: ' Want to Read' },
    { id: '2', name: ' Read' }
  ]
  return (
    <div className="list-books-content">
      <div className="container">
        {shelves.map(shelf => (
          <BookShelf key={shelf.id} title={shelf.name} books={props.books} />
        ))}
      </div>
    </div>
  )
}

export default BookList
