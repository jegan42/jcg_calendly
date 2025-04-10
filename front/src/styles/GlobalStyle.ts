import { createGlobalStyle } from 'styled-components';
import { theme as theme_front } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background-color: ${({ theme }) => theme_front.colors.background};
    color: ${({ theme }) => theme_front.colors.text};
  }
`;

export default GlobalStyle;
