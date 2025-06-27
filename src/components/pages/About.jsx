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
        <p className="text-justify">En Aprende360 creemos que la educación tecnológica es la clave para el éxito en el mundo actual. Somos una plataforma de cursos virtuales dedicada a ofrecer formación de alta calidad en diversas áreas de la tecnología, desde programación y desarrollo web hasta inteligencia artificial y ciberseguridad.

Nuestro objetivo es brindar acceso fácil y accesible a conocimientos actualizados, prácticos y relevantes para que cualquier persona, sin importar su nivel, pueda aprender y crecer profesionalmente. Contamos con un equipo de expertos apasionados que diseñan cada curso con contenido dinámico, ejercicios prácticos y recursos interactivos para asegurar una experiencia de aprendizaje efectiva y motivadora.

En Aprende360, estamos comprometidos con tu desarrollo profesional y personal, acompañándote en cada paso para que puedas alcanzar tus metas y destacarte en el mundo tecnológico. Únete a nuestra comunidad y comienza hoy mismo a transformar tu futuro.</p>
      </div>

      </>
      
      );
    };
export default About;
