import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(p => p.id === productToAdd.id);
      if (existingProduct) {
        return prevCart.map(p =>
          p.id === productToAdd.id
            ? { ...p, quantity: p.quantity + (productToAdd.quantity || 1) }
            : p
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const emptyCart = () => setCart([]);

  return (
    <CarritoContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CarritoContext.Provider>
  );
};