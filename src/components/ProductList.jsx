import React from 'react';
import styled from 'styled-components';
import ProductCard from './Product';
import { useProducts } from '../context/ProductsContext';

const ProductList = ({ addToCart }) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className="text-center my-4">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger my-4">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center text-muted my-4">No hay productos para mostrar.</p>;
  }

  return (
    <Wrapper>
      <h2 className="text-center mb-4 fw-bold">🎓 Galería de Productos</h2>

      <div className="row justify-content-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4"
          >
            <CardWrapper>
              <ProductCard product={product} addToCart={addToCart} />
            </CardWrapper>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.div`
  padding: 3rem 1rem;
  background-color: #f8f9fa;
`;

const CardWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;