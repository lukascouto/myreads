import React from 'react'

function ListBooks(props) {
    const { books, onChangeShelf } = props
    return (
        <div>
            <ol className='books-grid'>
                <div className='row'>
                {books.map((book) => (
                   <li key={book.id} className="col-md-3 col-sm-6 p-2">
                      <div className="card text-center pt-4">
                          <img className="card-img-top mx-auto"
                               src={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail}
                               alt="Books thumbnail">
                          </img>
                          <div className="book-shelf-changer">
                              <select
                                  onChange={(event) => onChangeShelf(book, event.target.value)}
                                  value={book.shelf === undefined ? 'none' : book.shelf}
                              >
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                              </select>
                          </div>
                          <div className="card-body">
                              <p className="card-title">{book.title}</p>
                              <p className="card-text">{book.authors === undefined ? '' : book.authors.join(', ')}</p>
                          </div>
                      </div>
                   </li>
                ))}
                </div>
            </ol>
        </div>
    )
}

export default ListBooks