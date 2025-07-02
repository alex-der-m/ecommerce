import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ProductCard from './Product';
import { useProducts } from '../context/ProductsContext';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);
  const productsPerPage = 8;

  const { theme } = useTheme();

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );
  const last = currentPage * productsPerPage;
  const first = last - productsPerPage;
  const current = filtered.slice(first, last);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  if (loading) return <p className="text-center my-4">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger my-4">{error}</p>;
  if (!products.length)
    return <p className="text-center text-muted my-4">Sin productos aún.</p>;

  return (
    <Wrapper themeMode={theme}>
      <h2 className="text-center mb-3 fw-bold">Elige tu curso ideal</h2>

      <div className="mb-4 d-flex justify-content-center">
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <span
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme === 'dark' ? '#ccc' : '#aaa',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Buscar curso..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#eee' : '#000',
              borderColor: theme === 'dark' ? '#555' : '#ced4da',
            }}
          />
        </div>
      </div>

      <div className="row">
        {current.map((prod) => (
          <div
            key={prod.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            onMouseEnter={() => setHoveredId(prod.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <ProductCard
              product={prod}
              isDimmed={hoveredId !== null && hoveredId !== prod.id}
              isActive={hoveredId === prod.id}
              onMouseEnter={() => setHoveredId(prod.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
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
  background-color: ${({ themeMode }) =>
    themeMode === 'dark' ? '#121212' : '#f8f9fa'};
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#eee' : '#000')};
`;