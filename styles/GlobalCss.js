import { createGlobalStyle, css } from "styled-components";

export const Wrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  font-family: 'Roboto Condensed', sans-serif;
  overflow-x: hidden;
}
html {  
  font-size: 10px;
  max-width: 1400px;
  font-display: initial;
}

h1,h2,h3,h4,h5 {
  font-size:2.5rem ;
}
  
`;
