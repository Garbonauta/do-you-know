import { injectGlobal } from 'styled-components'

const Global = injectGlobal`
  html {
    height: 100%
  }
  
  body {
    margin: 0;
    height: 100%;
    background-color: #F9F9F9;
    font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif;
  }
`

export default Global
