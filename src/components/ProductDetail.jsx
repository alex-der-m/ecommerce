import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://6822bc57b342dce8004f33a3.mockapi.io/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>Descripción: {product.description || "Sin descripción"}</p>
    </div>
  );
};

export default ProductDetail;