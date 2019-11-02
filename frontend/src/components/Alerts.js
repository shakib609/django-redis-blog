/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';

import Alert from './Alert';

const Alerts = () => {
  const alerts = useSelector(state => state.alerts);

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

export default Alerts;
