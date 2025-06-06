import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} eCommerce de Cursos Virtuales</p>
        <p className="mb-0 small">Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;