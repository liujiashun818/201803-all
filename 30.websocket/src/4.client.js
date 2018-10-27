let Socket = require('ws');
//ws 和 http都是基于tcp的应用层协议
let socket = new Socket('ws://127.0.0.1:8888');
//监听连接打开事件
socket.on('open', function () {
    console.log('连接已经成功建立，或者说成功打开');
    socket.send('服务器你好!');
});
socket.on('message', function (message) {
    console.log(message);
});