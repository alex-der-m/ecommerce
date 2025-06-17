import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCarrito();

  const handleAddToCart = () => {
    const existingProduct = cart.find(p => p.id === product.id);
    addToCart(product);
    if (existingProduct) {
      toast.info(`${product.name} ya está en el carrito. Se aumentó la cantidad.`, {
        icon: '🛒'
      });
    } else {
      toast.success(`${product.name} agregado al carrito.`, {
        icon: '✅'
      });
    }
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ minHeight: '100%' }}>
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold text-primary">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
          >
            <FaCartPlus className="me-2" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;