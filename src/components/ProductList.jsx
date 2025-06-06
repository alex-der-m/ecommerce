import { useState, useEffect } from "react";
import ProductCard from './Product';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://6822bc57b342dce8004f33a3.mockapi.io/productos";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los productos");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-muted my-4">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger my-4">Error al cargar productos. Inténtalo más tarde.</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Galería de productos</h2>

      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;