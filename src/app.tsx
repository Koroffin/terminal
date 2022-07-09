import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Terminal } from './components/terminal';

const GlobalStyle: any = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  input, textarea {
    border: 0;
    outline: 0;
    &:focused {
      border: 0;
      outline: 0;
    }
  }
`;

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Terminal />
    </>
  );
};
