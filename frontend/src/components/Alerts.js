/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';

import Alert from './Alert';

const Alerts = ({ alerts }) => {
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
        <Alert alert={alert} key={alert.id} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({ alerts: state.alerts });

export default connect(mapStateToProps)(Alerts);
