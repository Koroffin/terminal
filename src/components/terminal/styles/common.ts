import { css } from 'styled-components';

export const common = css`
  ::-moz-selection {
    /* Code for Firefox */
    color: rgb(75, 79, 92);
    background: rgb(255, 255, 255);
  }
  ::selection {
    color: rgb(75, 79, 92);
    background: rgb(255, 255, 255);
  }

  font-size: 17px;
  color: white;
`;
