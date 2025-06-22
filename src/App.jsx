import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/estaticos/Header';
import Footer from './components/estaticos/Footer';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import ProductDetail from './components/ProductDetail';
import Admin from './components/pages/Admin';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HoverProvider, useHover } from './context/HoverContext';
import styled from 'styled-components';

import TermsAndConditions from './components/pages/TermsAndConditions';

const ContentWrapper = styled.div`
  transition: filter 0.3s ease;
  filter: ${({ blur }) => (blur ? 'blur(4px) brightness(0.7)' : 'none')};
  pointer-events: ${({ blur }) => (blur ? 'none' : 'auto')};
`;

const AppContent = () => {
  const { hoveredId } = useHover();

  return (
    <ContentWrapper blur={hoveredId !== null}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ContentWrapper>
  );
};

const App = () => {
  return (
    <HoverProvider>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </HoverProvider>
  );
};

export default App;