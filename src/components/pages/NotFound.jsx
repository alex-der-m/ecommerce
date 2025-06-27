import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">¡Oops! Página no encontrada</h2>
      <p className="text-muted">
        La página que estás buscando no existe o fue movida.
      </p>

      <Link to="/" className="btn btn-outline-primary btn-lg mt-3">
        Volver al inicio
      </Link>

      <div className="mt-5">
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="Página no encontrada"
          className="img-fluid"
          style={{ maxWidth: "400px" }}
        />
      </div>
    </div>
  );
};

export default NotFound;