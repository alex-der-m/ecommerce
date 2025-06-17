import React from 'react';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contacto | Mi Tienda React</title>
        <meta name="description" content="Ponete en contacto con nosotros para consultas, sugerencias o ayuda con tu compra." />
      </Helmet>

      <div className="container my-5">
        <h1 className="text-center">Contacto</h1>
        <p className="text-center">Escribinos para cualquier consulta o sugerencia. ¡Te respondemos a la brevedad!</p>
      </div>
    </>
  );
};

export default Contact;