import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.headerBorder};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.headerText};

  span.logo-style {
    color: ${({ theme }) => theme.logoAccent};
  }
`;

const Greeting = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.headerText};
  font-weight: 500;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1rem;
  a {
    color: ${({ theme }) => theme.headerText};
    font-weight: 500;
    &.active {
      text-decoration: underline;
    }
  }
`;

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button, .cart-icon {
    background: none;
    border: none;
    color: ${({ theme }) => theme.headerText};
    font-size: 1.1rem;
    cursor: pointer;
    position: relative;
  }

  .badge {
    position: absolute;
    top: -4px;
    right: -8px;
    background: ${({ theme }) => theme.badgeBg};
    color: ${({ theme }) => theme.badgeText};
    border-radius: 50%;
    padding: 0.1rem 0.4rem;
    font-size: 0.7rem;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCarrito();
  const { theme: appTheme, toggleTheme } = useAppTheme();
  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);

  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
      toast.info('Sesión cerrada correctamente 👋');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const getGreetingName = () => {
    if (!user) return '';
    if (user.role === 'admin') return 'admin';
    const nameFromEmail = user.email.split('@')[0];
    return nameFromEmail;
  };

  return (
    <Bar>
      <LeftSection>
        <Brand>
          Aprende <span className="logo-style">360</span>
        </Brand>
        {user && <Greeting>Hola, {getGreetingName()}</Greeting>}
      </LeftSection>

      <NavMenu>
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>Nosotros</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contacto</NavLink>
        {user && (
          <NavLink to="/my-courses" className={({isActive}) => isActive ? 'active' : ''}>Mis Cursos</NavLink>
        )}
      </NavMenu>

      <UserControls>
        {user && (
          <>
            <button onClick={handleAuth} title="Cerrar sesión" aria-label="Cerrar sesión">
              <FaSignOutAlt />
            </button>
            <NavLink to="/cart" className="cart-icon" title="Carrito">
              <FaShoppingCart />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </NavLink>
          </>
        )}
        {!user && (
          <button onClick={handleAuth} title="Iniciar sesión" aria-label="Iniciar sesión">
            <FaSignInAlt />
          </button>
        )}
        <button onClick={toggleTheme} title="Cambiar tema" aria-label="Cambiar tema">
          {appTheme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </UserControls>
    </Bar>
  );
};

export default Header;