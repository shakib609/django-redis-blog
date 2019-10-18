/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Notification from 'react-bulma-components/lib/components/notification';

import { removeAlert } from '../actions/alertsActions';

const Alerts = ({ alerts, removeAlert }) => {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 5px;
        right: 5px;
        width: 220px;
        height: auto;
      `}
    >
      {alerts.map(alert => (
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
      ))}
    </div>
  );
};

const mapStateToProps = state => ({ alerts: state.alerts });

const mapDispatchToProps = dispatch => ({
  removeAlert: id => dispatch(removeAlert(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
