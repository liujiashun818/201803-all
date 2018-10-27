// {app_root}/app/io/middleware/connection.js
module.exports = app => {
    return async (ctx, next) => {
        //ctx是上下文，socket代表跟客户端通信的socket对象
        console.log(`客户端${ctx.socket.id}开始连接`);
        ctx.socket.emit('message', '中间件里回应说连接已经建立!');
        await next();
        console.log(`客户端${ctx.socket.id}断开连接`);
    };
};