import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { i18n, appWithTranslation } from 'lib/i18n';
import initializeStore from 'lib/store';

import { changeLocale } from 'actions/locale';

import MapContainer from 'containers/Map';
import LocaleSelector from 'components/LocaleSelector';

class ExtendedApp extends App {
    render() {
        const {
            Component,
            pageProps,
            store,
        } = this.props;

        return (
            <Container>
                <Head>
                    <title>Map application</title>
                </Head>
                <Provider store={store}>
                    <MapContainer />
                    <Component {...pageProps} />
                    <LocaleSelector
                        locales={[ 'ru', 'en', 'de' ]}
                        currentLocale={i18n.language}
                        onChangeLocale={(locale) => {
                            i18n.changeLanguage(locale);
                            store.dispatch(changeLocale());
                        }}
                    />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(initializeStore)(appWithTranslation(ExtendedApp));
