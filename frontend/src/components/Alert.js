/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Notification from 'react-bulma-components/lib/components/notification';

import { removeAlert } from '../actions/alertsActions';

const Alert = ({ removeAlert, alert }) => {
  useEffect(() => {
    setTimeout(() => {
      removeAlert(alert.id);
    }, 5000);
  });

  return (
    <Notification
      css={css`
        padding: 1rem;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      `}
      color={alert.type === 'error' ? 'danger' : alert.type}
    >
      {alert.message}
      <Button remove onClick={() => removeAlert(alert.id)} />
    </Notification>
  );
};

const mapDispatchToProps = dispatch => ({
  removeAlert: id => dispatch(removeAlert(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Alert);
