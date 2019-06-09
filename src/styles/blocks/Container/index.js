import styled, { css } from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.padding};
  margin-left: auto;
  margin-right: auto;

  ${props =>
    props.full &&
    css`
      max-width: 100%;
    `}

  ${props =>
    props.medium &&
    css`
      max-width: 1000px;
    `}

    ${props =>
      props.small &&
      css`
        max-width: 800px;
      `}
`;

export default Container;
