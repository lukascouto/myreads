import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    /*
    componentDidMount() {
        BooksAPI.search(this.props.query)
            .then((books) => {
                this.setState(() =>({
                    books
                }))
            })
    }
    */

    render() {
        const { query } = this.state
        const { books, onChangeShelf } = this.props
        return (
            <div className='app'>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            to='/'
                            className="close-search"
                        >Close
                        </Link>
                        <div className="search-books-input-wrapper">

                            <input
                                className='search-books'
                                type='text'
                                placeholder='Search by title or author'
                                //value={this.state.query}
                                //onChange={(event) => this.updateQuery(event.target.value)}
                            />

                        </div>
                    </div>
                    <div className="search-books-results">
                        {/*{JSON.stringify(this.state)}*/}
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
                                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                }}
                                            >
                                            </div>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    onChange={(event) => onChangeShelf(book, event.target.value)}
                                                    value={book.shelf}
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

                    </div>
                </div>
            </div>
        )
    }

}
export default SearchPage