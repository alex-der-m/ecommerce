import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const API_URL = 'https://6822bc57b342dce8004f33a3.mockapi.io/productos';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        setError('Error al cargar productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await axios.post(API_URL, product);
      setProducts([...products, res.data]);
    } catch {
      throw new Error('Error al agregar producto.');
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts(products.map((p) => (p.id === id ? res.data : p)));
    } catch {
      throw new Error('Error al editar producto.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      throw new Error('Error al eliminar producto.');
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        editProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
