// {app_root}/app/io/middleware/connection.js
module.exports = app => {
    return async (ctx, next) => {
        //ctx是上下文，socket代表跟客户端通信的socket对象
        console.log(`客户端${ctx.socket.id}发消息之前`);
        await next();
        console.log(`客户端${ctx.socket.id}结束发之后`);
    };
};