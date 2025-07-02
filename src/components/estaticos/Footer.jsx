// src/components/estaticos/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #222; /* Fondo oscuro */
  color: white;
  padding: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
  margin-top: auto; /* Para pegar al fondo si usas flex en App */
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        © 2025 Aprende 360 - Todos los derechos reservados.
      </Container>
    </FooterWrapper>
  );
};

export default Footer;