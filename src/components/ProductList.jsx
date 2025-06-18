import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import ProductCard from './Product';
import { useProducts } from '../context/ProductsContext';

const ProductList = ({ addToCart }) => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <p className="text-center my-4">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger my-4">{error}</p>;
  if (!products.length) return <p className="text-center text-muted my-4">No hay productos para mostrar.</p>;

  return (
    <Wrapper>
      <h2 className="text-center mb-4 fw-bold">🎓 Galería de Productos</h2>

<div className="mb-4 d-flex justify-content-center">
  <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
    <span
      style={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#aaa',
        pointerEvents: 'none',
      }}
    >
      🔍
    </span>
    <input
      type="text"
      className="form-control ps-5"
      placeholder="Buscar producto..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
</div>

</div>
      <div className="row justify-content-center">
        {currentProducts.map((product) => (
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

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
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