import React from 'react'

function Navbar () {
    return (
        <div>

          <div className="jumbotron mb-0">
              <h1>Teste</h1>
              <p>Descrição teste</p>
          </div>
              <nav className="navbar navbar-light bg-white sticky-top">
                  <div className='container'>
                      <a className="navbar-link" href="#">Currently Reading</a>
                      <a className="navbar-link" href="#">Want To Read</a>
                      <a className="navbar-link" href="#">Read</a>
                  </div>
              </nav>

        </div>
    )
}
export default Navbar