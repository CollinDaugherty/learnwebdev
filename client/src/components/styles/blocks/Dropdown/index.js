import styled from 'styled-components';

const padding = '4px 16px';

const Dropdown = styled.div`
  ul {
    display: none;
    position: absolute;
    z-index: 100;

    a,
    button {
      color: ${props => props.theme.body.fontColor};
      text-align: left;
      line-height: ${props => props.theme.body.lineHeight};
    }

    svg {
      color: ${props => props.theme.color.neutral._700};
    }
  }

  span {
    padding: ${padding};
  }

  &:hover {
    ul {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: auto;
      right: 20px;
      background: white;
      border: ${props => props.theme.border.border};
      border-radius: ${props => props.theme.border.radius};
      box-shadow: ${props => props.theme.shadow.med};
      text-align: left;

      a,
      button {
        margin: 0;
        width: 100%;
        padding: ${padding};
        border-radius: 0px;

        &:last-child {
          border-bottom-left-radius: ${props => props.theme.border.radius};
          border-bottom-right-radius: ${props => props.theme.border.radius};
        }

        &:hover {
          color: white;
          background: ${props => props.theme.color.primary._400};

          svg {
            color: white;
          }
        }
      }
    }
  }
`;

export default Dropdown;
