import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky-top bg-primary text-white shadow-sm">
      <div className="container py-3">
        <h1 className="text-center mb-3 fw-bold">eCommerce de Cursos Virtuales</h1>
        <nav className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
          <ul className="nav">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => "nav-link text-white" + (isActive ? " fw-bold border-bottom border-light" : "")}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => "nav-link text-white" + (isActive ? " fw-bold border-bottom border-light" : "")}
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => "nav-link text-white" + (isActive ? " fw-bold border-bottom border-light" : "")}
              >
                Contacto
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/cart" 
                    className={({ isActive }) => "nav-link text-white" + (isActive ? " fw-bold border-bottom border-light" : "")}
                  >
                    Carrito
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => "nav-link text-white" + (isActive ? " fw-bold border-bottom border-light" : "")}
                  >
                    Admin
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <button onClick={handleAuth} className="btn btn-outline-light ms-3">
            {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;