import React from 'react';
import { Helmet } from 'react-helmet';
import ProductList from '../ProductList';
import { useCarrito } from '../../context/CarritoContext';
import { useProducts } from '../../context/ProductsContext';

const Home = () => {
  const { cart, emptyCart, addToCart } = useCarrito();
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className='container my-5'>
      <Helmet>
        <title>Inicio | Mi Tienda React</title>
        <meta name="description" content="Descubrí los mejores productos en nuestra tienda online hecha con React." />
      </Helmet>

      <h2 className="text-center fw-bold mb-4">Productos Disponibles</h2>
      <ProductList products={products} addToCart={addToCart} />

      <div className="mt-5">
        <h3 className="fw-bold mb-4">Carrito de Compras</h3>
        {cart.length === 0 ? (
          <p className="text-muted fst-italic">El carrito está vacío.</p>
        ) : (
        <ul className="list-group shadow rounded">
          {cart.map((product, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              style={{ padding: '1rem 1.5rem' }}
              <div className="d-flex align-items-center gap-3">
                <img
                  src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}/>
              <div>
                <h6 className="mb-1">{product.name}</h6>
                <small className="text-secondary">Cantidad: {product.quantity}</small>
              </div>
            </div>

            <span className="fw-semibold" style={{ minWidth: '70px', textAlign: 'right' }}>
              ${(product.price * product.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
        )}

        {cart.length > 0 && (
          <button onClick={emptyCart} className="btn btn-danger mt-3" style={{ fontWeight: '600', letterSpacing: '0.03em' }}>
            Vaciar Carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;