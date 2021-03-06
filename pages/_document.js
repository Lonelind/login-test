import React from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import GlobalStyle from 'global.style';

export default class AppDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles((
                    <>
                        <GlobalStyle />
                        <App {...props} />
                    </>
                )),
            });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                namespacesRequired: ['common'],
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}
