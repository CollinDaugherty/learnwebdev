import React, { Component } from 'react';
import styled from 'styled-components';
import Container from './styles/blocks/Container';

const Foot = styled.footer`
  background: ${props => props.theme.color.neutral300};
  text-align: center;
  font-size: 1.4rem;
  width: 100%;
`;

class Footer extends Component {
  render() {
    return (
      <Foot>
        <Container>
          <p>Made with &lt;3 by Collin Daugherty</p>
        </Container>
      </Foot>
    );
  }
}

export default Footer;
