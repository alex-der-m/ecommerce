import React from "react";

const Cart = ({ cart, removeFromCart, emptyCart }) => {
  const total = cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);

  return (
    <div className={`cart-drawer ${cart.length > 0 ? 'open' : ''}`}>
      <div className="cart-header">
        <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
      </div>
      <div className="cart-content">
        {cart.length === 0 ? (
        <p style={{ color: 'red' }}>El carrito está vacío</p>
        ) : (
          <>
            <ul className="cart-item">
              {cart.map((product, index) => (
                <li key={index} style={{ color: 'black' }}>
                  {product.name} x {product.quantity || 1} - ${product.price * (product.quantity || 1)}
                  <button onClick={() => removeFromCart(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
            <p style={{ color: 'black' }}>
              <strong>Total:</strong> ${total}
            </p>
            <button onClick={emptyCart} className="btn btn-danger mt-2">
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;