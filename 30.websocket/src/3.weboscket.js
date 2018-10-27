//ws是一个模块，用来用NODE来实现websocket客户端的服务器的
let Server = require('ws').Server;
//创建一个websocket服务器，并监听8888端口
let server = new Server({ port: 8888 });
//监听客户端的连接,当客户端连接到来的时候，执行回调函数，
//并为每个客户端创建一个配套的socket
server.on('connection', function (socket) {
    //在服务器端监听客户端的消息
    socket.on('message', function (message) {
        console.log(message);
        //向对方，也就是客户端发送消息
        socket.send(message);
    });
});

