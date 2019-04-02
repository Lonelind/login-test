const Koa = require('koa');
const koaBody = require('koa-bodyparser');
const koaI18Next = require('koa-i18next');

const i18next = require('../i18n');

const renderer = require('./renderer');

export default async (port, nextjsHandle) => {
    const app = new Koa();

    app.keys = ['A', 'B', 'C'];

    app.use(koaBody());
    app.use(async (ctx, next) => {
        ctx.response.status = 200;
        await next();
    });

    app.use(session({
        key: 'session',
    }, app));

    app.use(koaI18Next(i18next, {}));

    app.use(async (ctx, next) => {
        // Safari thinks of locale as language only regardless of region in common cases
        switch (ctx.session.locale) {
            case 'ru-RU':
            case 'en-US':
                break;
            case 'ru':
                ctx.session.locale = 'ru-RU';
                break;
            case 'en':
            default:
                ctx.session.locale = 'en-US';
        }

        ctx.cookies.set('locale', ctx.session.locale);
        ctx.req.session = ctx.session;

        await next();
    });

    app.use(await renderer(nextjsHandle));

    return app;
};
