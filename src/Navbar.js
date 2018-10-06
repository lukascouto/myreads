import React from 'react'
import {Link, Route} from "react-router-dom";
import ListBooks from "./ListBooks";

function Navbar () {
    return (
        <div>
           <div className='app'>
               <div className='list-books'>
                   <div className='list-books-title'>
                       <h1>MyReads</h1>
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
    )
}
export default Navbar