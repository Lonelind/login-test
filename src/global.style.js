import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&subset=cyrillic,latin-ext');

    html, body, #__next {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    .link {
        cursor: pointer;
    }
`;
