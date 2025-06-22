import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const getYoutubeThumbnail = (videoUrl) => {
  try {
    const parts = videoUrl.split('/embed/');
    const videoId = parts[1]?.split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
};

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCarrito();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ✅ evita la navegación al hacer clic en el botón
    e.preventDefault();  // ✅ previene comportamiento del <Link>

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

  const thumbnail = getYoutubeThumbnail(product.video);

  return (
    <div className="card mb-3 shadow-sm" style={{ minHeight: '100%' }}>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={`Miniatura de ${product.name}`}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      ) : (
        <div className="p-3 text-center bg-light text-muted">
          Vista previa no disponible
        </div>
      )}

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">Stock disponible: {product.stock}</p>
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