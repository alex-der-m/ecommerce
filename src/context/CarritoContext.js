import React, { createContext, useContext, useState } from 'react';
import { useProducts } from './ProductsContext';
import { useAuth } from './AuthContext';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [progress, setProgress] = useState({});

  const productsContext = useProducts();
  if (!productsContext) {
    throw new Error('❌ useProducts() devolvió undefined. Asegurate de envolver CarritoProvider dentro de ProductsProvider.');
  }

  const { incrementStock } = productsContext;
  const { isAuthenticated } = useAuth();

  const addToCart = (product) => {
    if (!isAuthenticated) {
      throw new Error('Debes iniciar sesión para agregar productos al carrito');
    }
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  typeof item.quantity === 'number' ? item.quantity + 1 : 1,
              }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const productToRemove = prevCart[index];
      if (productToRemove) {
        incrementStock(productToRemove.id).catch(console.error);
      }
      return prevCart.filter((_, i) => i !== index);
    });
  };

  const emptyCart = async () => {
    try {
      for (const item of cart) {
        for (let i = 0; i < item.quantity; i++) {
          await incrementStock(item.id);
        }
      }
    } catch (error) {
      console.error('Error al devolver stock al vaciar el carrito:', error);
    }
    setCart([]);
  };

  const updateProgress = (id, value) => {
    setProgress((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <CarritoContext.Provider
      value={{ cart, addToCart, removeFromCart, emptyCart, progress, updateProgress }}
    >
      {children}
    </CarritoContext.Provider>
  );
};