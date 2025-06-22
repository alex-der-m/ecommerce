import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-4 mt-auto">
      <div className="container text-center">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Aprende360</h5>
            <p className="small">
              Aprende desde casa con nuestros cursos virtuales. Calidad, accesibilidad y flexibilidad para tu formación profesional.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase">Enlaces útiles</h6>
            <ul className="list-unstyled">
              <li><NavLink to="/about" className="text-white text-decoration-none">Nosotros</NavLink></li>
              <li><NavLink to="/contact" className="text-white text-decoration-none">Contacto</NavLink></li>
              <li><NavLink to="/terms" className="text-white text-decoration-none">Términos y Condiciones</NavLink></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase">Contacto</h6>
            <p className="mb-1 small"><i className="fa-solid fa-envelope me-2"></i> contacto@aprende360.com</p>
            <p className="mb-1 small"><i className="fa-solid fa-phone me-2"></i> +54 11 1234 5678</p>
            <p className="small"><i className="fa-solid fa-location-dot me-2"></i> Buenos Aires, Argentina</p>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="text-center pb-3 small">
          &copy; {new Date().getFullYear()} Aprende360. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;