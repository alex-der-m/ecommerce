import React from "react";
import { useCarrito } from "../context/CarritoContext";

const Cart = () => {
  const { cart, removeFromCart, emptyCart } = useCarrito();

  const total = cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">🛒 Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-danger text-center">El carrito está vacío</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((product, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{product.name}</strong> x {product.quantity || 1}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="text-success fw-bold">
                    ${product.price * (product.quantity || 1)}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="btn btn-sm btn-outline-danger"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: <span className="text-primary">${total}</span></h4>
            <button onClick={emptyCart} className="btn btn-danger">
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;