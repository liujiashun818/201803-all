let Koa = require('koa');
let app = new Koa();
app.use(async function (ctx, next) {
    await promise;
    await next()
    setTimeout(async function () {
        await next();
    }, 500);
});
app.use(async function (ctx, next) {
    ctx.body = 'hello';
});
app.listen(9000);