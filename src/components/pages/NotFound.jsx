import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 style={{ fontSize: "6rem", fontWeight: "bold", color: "#dc3545" }}>
        404
      </h1>
      <h2 className="mb-3">¡Oops! Página no encontrada</h2>
      <p className="mb-4 text-muted">
        La página que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className="btn btn-outline-primary btn-lg">
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