import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

const API_URL = 'https://6822bc57b342dce8004f33a3.mockapi.io/productos';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setError('Error al cargar productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await axios.post(API_URL, product);
      setProducts((prev) => [...prev, res.data]);
    } catch {
      throw new Error('Error al agregar producto.');
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    } catch {
      throw new Error('Error al editar producto.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      throw new Error('Error al eliminar producto.');
    }
  };

  const decrementStock = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error('Producto no encontrado');
    if (product.stock <= 0) throw new Error('Stock insuficiente');

    const updatedProduct = { ...product, stock: product.stock - 1 };
    const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const incrementStock = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error('Producto no encontrado');

    const updatedProduct = { ...product, stock: product.stock + 1 };
    const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        editProduct,
        deleteProduct,
        refreshProducts,
        decrementStock,
        incrementStock,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

console.log("✅ ProductsContext cargado correctamente.");
