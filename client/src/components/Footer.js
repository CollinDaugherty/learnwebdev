import React from 'react';
import styled from 'styled-components';
import Container from './styles/blocks/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCode } from '@fortawesome/free-solid-svg-icons';

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
        <p>
          <FontAwesomeIcon icon={faCode} /> with{' '}
          <FontAwesomeIcon icon={faHeart} /> by Collin Daugherty
        </p>
      </Container>
    </Foot>
  );
};

export default Footer;
