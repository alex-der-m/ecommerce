import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <header className='bg-primary text-white p-3 mb-4'>
      <div className='container'>
        <h1 className='text-center nav-title'>eCommerce de Cursos Virtuales</h1>
        <nav className='d-flex justify-content-between align-items-center'>
          <ul className="nav">
            <li className="nav-item">
              <Link className='nav-link text-white' to='/'>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link text-white' to='/about'>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link text-white' to='/contact'>Contacto</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className='nav-link text-white' to='/cart'>Carrito</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link text-white' to='/admin'>Admin</Link>
                </li>
              </>
            )}
          </ul>

          <button onClick={handleAuth} className='btn btn-outline-light'>
            {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;