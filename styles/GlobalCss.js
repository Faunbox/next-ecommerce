import { createGlobalStyle, css } from "styled-components";

export const Wrapper = css`
  display: flex;
  width: 100%;
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
  /* overflow: hidden; */
}
html {  
  font-size: clamp(12px, 1vw + 5px, 16px);
  max-width: 1400px;
  font-display: initial;
  margin: 0 auto;
}

h1,h2,h3,h4,h5 {
  font-size:1.5rem ;
}
  
`;
