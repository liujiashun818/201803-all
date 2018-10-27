//options来自于配置文件
module.exports = (options, app) => {
    return async function (ctx, next) {
        const start = Date.now();
        await next();
        console.log(`本次请求一共花费了 ${Date.now() - start} ms`);
    }
}