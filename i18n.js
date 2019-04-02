import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['de', 'ru'],
    fallbackLng: ['ru'],
    defaultNS: 'common',
    detection: {
        lookupSession: 'locale',
        lookupCookie: 'locale',
        order: ['session', 'cookie', 'header'],
    },
    next: true,
});

export default NextI18NextInstance;

export const {
    appWithTranslation,
    withNamespaces,
} = NextI18NextInstance;
