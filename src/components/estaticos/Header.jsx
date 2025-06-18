import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const getNavLinkClass = ({ isActive }) =>
    'nav-link text-white' + (isActive ? ' fw-bold border-bottom border-light' : '');

  return (
    <header className="sticky-top bg-primary text-white shadow-sm">
      <div className="container py-3">
        <h1 className="text-center mb-3 fw-bold">eCommerce de Cursos Virtuales</h1>
        <nav role="navigation" aria-label="Principal" className="d-flex align-items-center flex-wrap">
          <ul className="nav d-flex gap-3 mb-0">
            <li className="nav-item">
              <NavLink to="/" className={getNavLinkClass}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={getNavLinkClass}>Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={getNavLinkClass}>Contacto</NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink to="/cart" className={getNavLinkClass}>Carrito</NavLink>
                </li>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <NavLink to="/admin" className={getNavLinkClass}>Admin</NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          <button onClick={handleAuth} className="btn btn-outline-light ms-auto mt-2 mt-sm-0">
            {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;