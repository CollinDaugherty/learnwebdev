import styled, { css } from 'styled-components';

import Title from './Title';
import Subtitle from './Subtitle';
import Content from './Content';
import Upvote from './Upvote';
import Tag from './Tag';
import Instructor from './Instructor';
import Categories from './Categories';
import Footer from './Footer';

const Card = styled.div`
  background: #fff;
  margin-bottom: 2.5rem;
  border-radius: ${props => props.theme.border.radius};
  box-shadow: ${props => props.theme.shadow.med};

  ${props =>
    props.tutorialCard &&
    css`
      display: grid;
      grid-template-columns: 7rem auto;
      grid-template-rows: 3fr;

      ${Content} {
        padding-bottom: 1rem;
        grid-column: 2 / 3;
        grid-row: 0 / 1;
      }

      ${Footer} {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
    `}
`;

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Content = Content;
Card.Upvote = Upvote;
Card.Tag = Tag;
Card.Instructor = Instructor;
Card.Categories = Categories;
Card.Footer = Footer;

export default Card;