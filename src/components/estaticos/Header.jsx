import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCarrito();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleAuth = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const getNavLinkClass = ({ isActive }) =>
    'nav-link text-white' + (isActive ? ' fw-bold border-bottom border-light' : '');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky-top bg-primary text-white shadow-sm">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <h4 className="fw-bold mb-2 mb-sm-0">Aprende360: Tu plataforma de cursos online</h4>

          {user && (
            <div className="text-end d-none d-sm-block">
              <small>
                👋 Bienvenido, <strong>{user.username}</strong>
              </small>
            </div>
          )}
        </div>

        <nav className="navbar navbar-expand-sm p-0">
          <button
            className="navbar-toggler border-light"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <NavLink to="/" className={getNavLinkClass}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={getNavLinkClass}>
                  Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className={getNavLinkClass}>
                  Contacto
                </NavLink>
              </li>
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <NavLink to="/admin" className={getNavLinkClass}>
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center mt-2 mt-sm-0">
              {user && (
                <NavLink
                  to="/cart"
                  className="position-relative me-3 text-white fs-5"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  <FaShoppingCart />
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </NavLink>
              )}

              <button onClick={handleAuth} className="btn btn-outline-light">
                {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;