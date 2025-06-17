import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
      <>
      <Helmet>
        <title>Nosotros | Mi Tienda React</title>
        <meta name="description" content="Conocé más sobre nuestro equipo y la misión de nuestra tienda online." />
      </Helmet>

      <div className="container my-5">
        <h1 className="text-center">Sobre nosotros</h1>
        <p className="text-center">Somos una tienda comprometida con ofrecer lo mejor en productos de calidad.</p>
      </div>

      </>
      
      );
    };
export default About;
