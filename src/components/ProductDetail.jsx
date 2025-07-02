import { useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  const { addToCart, cart } = useCarrito();

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

  if (!product) return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg rounded-4 p-4">
            <h2 className="fs-4 mb-3 text-center text-md-start">{product.name}</h2>
            <div className="mb-4 rounded-3 overflow-hidden">
              {product.video ? (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={product.video}
                    title={product.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <div className="text-muted text-center py-4 bg-light rounded">
                  Este curso aún no tiene un video asignado.
                </div>
              )}
            </div>

            <div className="mb-3">
              <p className="mb-1">
                <strong>Precio:</strong> ${product.price}
              </p>
              <p className="mb-1">
                <strong>Stock:</strong> {product.stock}
              </p>
              <p className="mb-1">
                <strong>Descripción:</strong> {product.description || 'Sin descripción'}
              </p>
            </div>

            <div className="d-grid">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2"
              >
                <FaCartPlus />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;