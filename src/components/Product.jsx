import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useCarrito } from '../context/CarritoContext';
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

const ProductCard = ({
  product,
  isDimmed = false,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { addToCart, cart } = useCarrito();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const existingProduct = cart.find((p) => p.id === product.id);
      addToCart(product);
      if (existingProduct) {
        toast.info(`${product.name} ya está en el carrito. Se aumentó la cantidad.`, {
          icon: '🛒',
        });
      } else {
        toast.success(`${product.name} agregado al carrito.`, {
          icon: '✅',
        });
      }
    } catch (error) {
      toast.error('Debes iniciar sesión para agregar cursos al carrito', { icon: '⚠️' });
    }
  };

  const thumbnail = getYoutubeThumbnail(product.video);

  return (
    <Link
      to={`/products/${product.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        className="card mb-3 shadow-sm"
        style={{
          minHeight: '100%',
          transition: 'all 0.3s ease',
          filter: isDimmed ? 'blur(2px) brightness(0.7)' : 'none',
          boxShadow: isActive
            ? '0 8px 20px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
      >
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
    </Link>
  );
};

export default ProductCard;