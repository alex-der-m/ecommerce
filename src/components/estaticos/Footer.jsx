import React from 'react';
import styled, { useTheme as useStyledTheme } from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.footerBg};
  color: ${({ theme }) => theme.footerText};
  border-top: 2px solid ${({ theme }) => theme.footerBorder};
  text-align: center;
  padding: 1rem 0;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

const Footer = () => {
  const styledTheme = useStyledTheme();

  return (
    <FooterWrapper theme={styledTheme}>
      <div className="container">
        <small>© {new Date().getFullYear()} Aprende360. Todos los derechos reservados.</small>
      </div>
    </FooterWrapper>
  );
};

export default Footer;