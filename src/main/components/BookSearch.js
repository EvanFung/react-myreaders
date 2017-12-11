import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import BookListItem from './BookListItem';
class BookSearch extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
  };
  state = {
    query: '',
    results: []
  };

  updateQuery = query => {
    let trimedQuery = query.trim();
    this.setState({ query: trimedQuery });
    if (query !== '') this.handleBookSearch(trimedQuery);
  };

  handleBookSearch = query => {
    BooksAPI.search(query, 20).then(results => {
      let bookOnShelves = results.map(book => {
        book.shelf = this.props.getBookShelf(book.id);
        return book;
      });
      this.setState({ results: bookOnShelves });
    });
  };

  render() {
    const { query, results } = this.state;
    const { onShelfChange } = this.props;
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
                this.updateQuery(event.target.value);
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
    );
  }
}

export default BookSearch;
