import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :root{
        --color-orange : #FF6C02;
        --color-light-bg-color : #FFF9E9;
        --color-yellow : #FEDD89;
        --color-gray : #393939;
        --color-dark-bg-color : #2D2D2D;
        --color-navy : #13264E;
        --color-white : #FFFFFF;
        --color-black : #000000;
    }
    html {
        font-size: 62.5%;
    }
    * {
        box-sizing: border-box;
    }
    body{
        width: 100vw;
        height: 100vh;
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
    }
`;
