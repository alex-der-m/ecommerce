import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useCarrito } from '../context/CarritoContext';
import { FaShoppingCart } from 'react-icons/fa';

const quotes = [
  "🚀 Aprender hoy, liderar mañana.",
  "💡 La educación es el arma más poderosa.",
  "🎯 Tu futuro empieza con una decisión.",
  "📘 Cada clic te acerca a tu meta.",
  "🧠 Invierte en conocimiento, rinde toda la vida.",
];

const ProductList = () => {
  const { products } = useProducts();
  const { addToCart } = useCarrito();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('');
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFadeClass('fade-in');
      }, 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <div
        className={`text-center mb-4 py-2 ${fadeClass}`}
        style={{
          backgroundColor: '#f8f9fa', // mismo que bg-light
          borderRadius: '0.5rem',
          fontStyle: 'italic',
          color: '#0d6efd',
          boxShadow: '0 0 5px rgba(0,0,0,0.05)',
        }}
      >
        <strong>💬 {quotes[quoteIndex]}</strong>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                {product.video && (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={product.video}
                      title={product.name}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: ${product.price}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart className="me-2" />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;