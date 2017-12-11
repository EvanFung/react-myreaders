const api = 'https://reactnd-books-api.udacity.com'
import { SEARCH_TERMS } from '../constants/SearchTerms'
import escapeRegExp from 'escape-string-regexp'
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
const availableSearchTerms = SEARCH_TERMS.map(term => term.toLowerCase())
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const get = bookId =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(data => data.books)
/**
 * Checks if current query matches one of the available search terms.
 * @param  {String}  query [Search term]
 * @return {Boolean}       [true = found, false = not found]
 */
export const isValidQueryStr = query => {
  if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    return availableSearchTerms.some(term => match.test(term))
  } else {
    return false
  }
}
