import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import ProductDetail from './components/ProductDetail';
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/estaticos/Header';
import Footer from './components/estaticos/Footer';
import Cart from './components/Cart';
import NotFound from './components/pages/NotFound';


function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

const addToCart = (productToAdd) => {
  setCart((prevCart) => { const existingProduct = prevCart.find((p) => String(p.id) === String(productToAdd.id));

    if (existingProduct) 
      {
      return prevCart.map((p) =>
        String(p.id) === String(productToAdd.id) ? { ...p, quantity: p.quantity + productToAdd.quantity }: p);} 
      else 
      {
      return [...prevCart, productToAdd];
    }
  });
};


  const emptyCart = () => {
    setCart([]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Home cart={cart} setCart={setCart} addToCart={addToCart} emptyCart={emptyCart} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart cart={cart} removeFromCart={removeFromCart} emptyCart={emptyCart} />
              </ProtectedRoute>
            } />
            <Route path='/admin' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <div className='container text-center mt-4'>
                  <h2>Área de Administración</h2>
                  <p>Solo usuarios autenticados pueden ver esto.</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;