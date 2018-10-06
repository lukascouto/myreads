import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
      books: [],
      booksFound: [],
      query: ''
  }

  componentDidMount() {
      BooksAPI.getAll()
          .then((books) => {
          this.setState({books})
      })
   }

   componentDidUpdate() {
       BooksAPI.getAll()
           .then((books) => {
           if (this.state.books !== books) {
               this.setState({books})
           }
       })
   }

   /*
   Passa como argumento o valor digitado no input e seta no state
   verifica se a query não está vazia para poder chamar o método search da API
   verifica se não há erro no retorno do book
   verifica também se o response não está indefinido, para que não salve um novo estado vazio
   se passou, salva o novo estado com os livros encontrados com a query digitada
    */
   updateQuery = (query) => {
      this.setState({query: query})
      if (query !== '') {
          BooksAPI.search(query)
              .then((books) => {
                  if (!books.error) {
                      const booksEstante = this.state.books.filter(o => books.find(o2 => o.id === o2.id))
                      const booksSemEstante = books.filter(o => !this.state.books.find(o2 => o.id === o2.id))
                      this.setState({
                          booksFound: booksEstante.concat(booksSemEstante)
                      })
                  }
              })
              .catch(function (error) {
                  console.log(error.response)
              })
      }
   }

  /*
  Recupera o book<Objeto> e o shelf<String> do Select no componente ListBooks
  Chama o método update do BooksAPI passando como argumento o book e shelf para persistir no banco
  .then (se persistir) atualiza o shelf do livro atual
  depois chama o setState pegando o estado atual e passando para books
  */
  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf)
          .then(() => {
              book.shelf = shelf
              this.setState((currentState) => ({
                  books: currentState.books
              }))
          })
  }

  render() {
    const { booksFound, query } = this.state
    const showingBooks = query === ''
        ? booksFound.filter((b) => (b.title === ''))
        : booksFound
    return (

        <div>
          <Route exact path='/' render={() => (
              <div>
                  <div className='app'>
                      <div className='list-books'>
                          <div className='list-books-title'>
                              <h1>MyReads</h1>
                          </div>
                      </div>
                      <div className='list-books-content'>
                          <div>


                              <div className='bookshelf'>
                              <h2 className="bookshelf-title">Currently Reading</h2>
                              <div className="bookshelf-books">
                              <ListBooks
                                  books={this.state.books.filter((b) => (
                                      b.shelf === 'currentlyReading'
                                  ))}
                                  onChangeShelf={this.changeShelf}
                              />
                              </div>

                              <div className='bookshelf'>
                              <h2 className="bookshelf-title">Want To Read</h2>
                              <ListBooks
                                  books={this.state.books.filter((b) => (
                                      b.shelf === 'wantToRead'
                                  ))}
                                  onChangeShelf={this.changeShelf}
                              />
                              </div>

                              <div className='bookshelf'>
                              <h2 className="bookshelf-title">Read</h2>
                              <ListBooks
                                  books={this.state.books.filter((b) => (
                                      b.shelf === 'read'
                                  ))}
                                  onChangeShelf={this.changeShelf}
                              />
                              </div>


                              </div>
                          </div>
                      </div>
                      <div className="open-search">
                          <Link
                              to='/search'
                          >Add a book
                          </Link>
                      </div>
                  </div>
              </div>

          )}/>
          <Route path='/search' render={() => (
              <div>
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
                                      value={this.state.query}
                                      onChange={(event) => this.updateQuery(event.target.value)}
                                  />

                              </div>
                          </div>
                          <div className="search-books-results">
                              {JSON.stringify(this.state.query)}
                              <ListBooks
                                  books={showingBooks}
                                  onChangeShelf={this.changeShelf}
                              />
                          </div>
                      </div>
                  </div>
              </div>
          )}/>
        </div>
    )
  }
}

export default BooksApp
