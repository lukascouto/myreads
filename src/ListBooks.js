import React from 'react'

function ListBooks(props) {
    const { books, onChangeShelf } = props
    //console.log(books.shelf)
    return (
        <ol className='books-grid'>
            {books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className='book-top'>

                            <div
                                className='book-cover'
                                style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                        book.imageLinks === undefined ? `url('')` :
                                            `url(${book.imageLinks.thumbnail})`

                                }}
                            >
                            </div>
                            <div className="book-shelf-changer">
                                <select
                                    onChange={(event) => onChangeShelf(book, event.target.value)}
                                    value={book.shelf === undefined? 'none' : book.shelf}
                                >
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            ))}
        </ol>

    )
}
export default ListBooks