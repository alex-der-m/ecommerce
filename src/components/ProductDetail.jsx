import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const { addToCart, cart } = useCarrito();

  useEffect(() => {
    fetch(`https://6822bc57b342dce8004f33a3.mockapi.io/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar el producto.');
      });
  }, [id]);

  const handleAddToCart = () => {
    const existing = cart.find((item) => item.id === product.id);
    addToCart(product);
    if (existing) {
      toast.info(`${product.name} ya está en el carrito. Se aumentó la cantidad.`, {
        icon: '🛒',
      });
    } else {
      toast.success(`${product.name} agregado al carrito.`, {
        icon: '✅',
      });
    }
  };

  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!product) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">{product.name}</h2>
      <p className="text-muted mb-2">Precio: <strong>${product.price}</strong></p>
      <p className="mb-3">Stock disponible: {product.stock}</p>

      {product.video ? (
        <div className="ratio ratio-16x9 mb-4">
          <iframe
            src={product.video}
            title={product.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      ) : (
        <p className="text-muted">Este curso aún no tiene un video asignado.</p>
      )}

      <p className="mb-4">Descripción: {product.description || 'Sin descripción'}</p>

      <button
        onClick={handleAddToCart}
        className="btn btn-outline-primary d-flex align-items-center"
      >
        <FaCartPlus className="me-2" />
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductDetail;