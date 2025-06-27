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
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';

import styled from 'styled-components';
import TermsAndConditions from './components/pages/TermsAndConditions';

const ContentWrapper = styled.div`
  transition: filter 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  filter: ${({ blur }) => (blur ? 'blur(4px) brightness(0.7)' : 'none')};
  pointer-events: ${({ blur }) => (blur ? 'none' : 'auto')};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const AppContent = () => {
  const { hoveredId } = useHover();
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
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
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <HoverProvider>
        <AppContent />
        <ToastContainer position="bottom-right" autoClose={2000} />
      </HoverProvider>
    </ThemeProvider>
  );
};

export default App;