import React, { useState, useEffect } from 'react';
import Nav from './components/Nav'
import Product from './components/Product'
import Cart from './components/Cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    fetch("http://henri-potier.xebia.fr/books")
      .then(response => response.json())
      .then(response => setProducts(response))
      .catch(response => console.log("erreur fetching products"))

  }, [])

  const addBook = book => {


    setCart([...cart, book])
  }

  const removeBook = book => {
    let currentCart = cart;

    let newCart = currentCart.filter(n => !n.isbn.includes(book.isbn))
    setCart(newCart)
  }

  const searchBook = searchValue => {


    let bookFiltred = products.filter(book => book.title.includes(searchValue));

    setProducts(bookFiltred)
  }

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-expand-md navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Livres</Link>                        </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">Panier ({cart.length})</Link>
              </li>
            </ul>
            <Nav searchBook={searchBook} />

          </div>
        </nav>

        <div className="container">
          <div className="row">
            <Switch>
              <Route path="/cart" exact>
                <Cart Cart={cart} removeBook={removeBook} />
              </Route>
              <Route path="/" exact>
                {(products != null) ? products.map(book => <Product Product={book} addBook={addBook} />) : 'no books yet...'}

              </Route>
            </Switch>
          </div>
        </div>

      </Router>
    </>
  );
}

export default App;
