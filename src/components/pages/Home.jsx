import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList';
  import { useCarrito } from '../../context/CarritoContext';

const Home = () => {
  const { cart, addToCart, emptyCart } = useCarrito();  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://6822bc57b342dce8004f33a3.mockapi.io/productos')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar productos. Inténtalo más tarde.');
        setLoading(false);
      });
  }, []);

  return (
    <div className='container'>
      <h2>Productos Disponibles</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProductList addToCart={addToCart} products={products} />
      )}

      <div className="mt-4">
        <h3>Carrito de Compras</h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.name} - ${product.price} - Cantidad: {product.quantity}
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <button onClick={emptyCart} className="btn btn-danger mt-2">
            Vaciar Carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;