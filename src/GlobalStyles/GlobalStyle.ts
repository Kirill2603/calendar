import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Dialog, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box
  }

  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`