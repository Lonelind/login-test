export default (handle) => {
    return async (ctx) => {
        ctx.status = 200;
        ctx.respond = false;
        ctx.req.ctx = ctx;

        await handle(ctx.req, ctx.res);
    };
};
