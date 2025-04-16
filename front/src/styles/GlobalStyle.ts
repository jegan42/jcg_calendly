// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";
import { theme as theme_front } from "./theme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${theme_front.colors.background};
    color: ${theme_front.colors.text};
  }

  main {
    padding: 2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: 1rem;
  }

  button:focus, input:focus, select:focus {
    outline: 2px solid #0057ff;
    outline-offset: 2px;
  }

  ul {
    padding-left: 1rem;
  }

  form {
    margin-top: 1rem;
  }
`;

export default GlobalStyle;
