import React from 'react';
import styled from 'styled-components';
import Container from './styles/blocks/Container';

const Foot = styled.footer`
  background: ${props => props.theme.color.neutral._300};
  text-align: center;
  font-size: 1.4rem;
  width: 100%;
`;

const Footer = () => {
  return (
    <Foot>
      <Container>
        <p>Made with &lt;3 by Collin Daugherty</p>
      </Container>
    </Foot>
  );
};

export default Footer;
