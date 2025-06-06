import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/estaticos/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Admin from './components/pages/Admin';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}
  />    <Route path="/cart"  element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;