import React, { useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;

    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="card h-100 shadow-sm m-2" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <p className="text-muted">Stock: {product.stock}</p>

        {product.stock > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <button onClick={decrease} className="btn btn-outline-secondary btn-sm">-</button>
              <span>{quantity}</span>
              <button onClick={increase} className="btn btn-outline-secondary btn-sm">+</button>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary mt-auto">
              {added ? "Agregado ✔️" : (
                <>
                  <i className="fa-solid fa-cart-plus me-1"></i> Agregar al Carrito
                </>
              )}
            </button>
          </>
        ) : (
          <button className="btn btn-secondary mt-auto" disabled>
            Sin stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;