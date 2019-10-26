/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Loader from 'react-bulma-components/lib/components/loader';

const commonCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fullPageCSS = css`
  ${commonCSS}
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 31;
  background-color: rgba(255, 255, 255, 0.9);
`;

const defaultCSS = css`
  ${commonCSS}
  height: 150px;
  width: 100%;
`;

const LoadingIndicator = ({ fullPage = false }) => (
  <div css={fullPage ? fullPageCSS : defaultCSS}>
    <Loader
      css={css`
        width: 40px;
        height: 40px;
        border: 2px solid #00c4a7;
        border-top-color: transparent;
        border-right-color: transparent;
      `}
    />
  </div>
);

export default LoadingIndicator;
