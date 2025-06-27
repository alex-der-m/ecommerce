import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerText};
  border-bottom: 2px solid ${({ theme }) => theme.headerBorder};
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

const Title = styled.h3`
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.headerText};
  font-style: italic;

  span.bold {
    font-family: 'Courier New', monospace;
    font-weight: bold;
  }

  span.sub {
    font-family: Verdana, sans-serif;
    font-size: 1.3rem;
    color: #B5B2B2;
  }
`;

const NavButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.headerText};
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCarrito();
  const { theme: appTheme, toggleTheme } = useAppTheme();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleAuth = () => {
    if (user) {
      logout();
      toast.info('Sesión cerrada correctamente 👋');
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
    <HeaderWrapper className="sticky-top shadow-sm">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <Title className="fw-bold mb-2 mb-sm-0">
            Aprende <span className="bold">360</span>{' '}
            <span className="sub">Tu plataforma de cursos online</span>
          </Title>

          <div className="d-none d-sm-flex align-items-center gap-2">
            {user && (
              <>
                <small>
                  👋 Hola, <strong>{user.username}</strong>
                </small>
                <NavButton onClick={handleAuth} title="Cerrar sesión">
                  <FaSignOutAlt />
                </NavButton>
              </>
            )}

            {!user && (
              <NavButton onClick={handleAuth} title="Iniciar sesión">
                <FaSignInAlt />
              </NavButton>
            )}

            <NavButton onClick={toggleTheme} title="Cambiar tema">
              {appTheme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </NavButton>
          </div>
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

          <div
            className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
            id="navbarNav"
          >
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
            </div>
          </div>
        </nav>
      </div>
    </HeaderWrapper>
  );
};

export default Header;