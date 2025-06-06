import React from 'react';
import { useCarrito } from '../context/CarritoContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCarrito();

  return (
    <div className="card mb-3" style={{ minHeight: '100%' }}>
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
            onClick={() => addToCart(product)}
            className="btn btn-outline-primary btn-sm"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;