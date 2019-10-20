import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as theme from './styles/Variables';

import Container from './styles/blocks/Container';

const success = {
  text: theme.color.secondary._500,
  background: theme.color.secondary._200,
  border: theme.color.secondary._300
};

const warning = {
  text: theme.color.warning._500,
  background: theme.color.warning._100,
  border: theme.color.warning._300
};

const danger = {
  text: theme.color.danger._400,
  background: theme.color.danger._100,
  border: theme.color.danger._300
};

const primary = {
  text: theme.color.primary._500,
  background: theme.color.primary._100,
  border: theme.color.primary._400
};

const handleNotificationColors = notificationType => {
  switch (notificationType) {
    case 'success':
      return `
        color: ${success.text};
        background: ${success.background};
        border: 2px solid ${success.border};
      `;
    case 'warning':
      return `
        color: ${warning.text};
        background: ${warning.background};
        border: 2px solid ${warning.border};
      `;
    case 'danger':
    case 'error':
      return `
        color: ${danger.text};
        background: ${danger.background};
        border: 2px solid ${danger.border};
      `;
    default:
      return `
        color: ${primary.text};
        background: ${primary.background};
        border: 2px solid ${primary.border};
      `;
  }
};

const Notification = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  padding: 5px;
  margin: 30px auto;
  width: 75%;
  background: ${props => props.theme.color.neutral._300};
  border-radius: ${props => props.theme.border.radius};

  ${({ notificationType }) => handleNotificationColors(notificationType)};
`;

const Notifications = props => {
  const notifications = props.notifications;

  useEffect(() => {
    const timer = setTimeout(() => {
      props.clearNotification();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container small>
      {notifications.length ? (
        <div>
          {notifications.map((notification, i) => {
            return (
              <Notification notificationType={notification.type} key={i}>
                {notification.message}
              </Notification>
            );
          })}
        </div>
      ) : null}
    </Container>
  );
};

export default Notifications;
