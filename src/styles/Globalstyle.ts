import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

  ${reset}

  body,
  button,
  input,
  textarea {
    font-family: Roboto, 'Spoqa Han Sans Neo', sans-serif;
  }
  
`;

export default GlobalStyle;
