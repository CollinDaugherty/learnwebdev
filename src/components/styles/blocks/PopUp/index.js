import styled from 'styled-components';
import Card from '../Card';

const PopUp = styled.div`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: center;

  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  padding: 4rem;
  background: rgba(245, 249, 251, 0.9);
  z-index: 10000;

  ${Card} {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: -100px;
  }
`;

export default PopUp;
