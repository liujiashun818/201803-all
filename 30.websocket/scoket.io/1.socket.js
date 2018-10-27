//express+socket联合使用
//express负责 返回页面和样式等静态资源，socket.io负责 消息通信
let express = require('express');
const path = require('path');
let app = express();
app.get('/news', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/news.html'));
});
app.get('/goods', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/goods.html'));
});
let server = require('http').createServer(app);
let io = require('socket.io')(server);
//监听客户端发过来的连接
//命名是用来实现隔离的
let sockets = {};
io.on('connection', function (socket) {
    //
    //当前用户所有的房间
    let rooms = [];
    let username;//用户名刚开始的时候是undefined
    //监听客户端发过来的消息
    socket.on('message', function (message) {
        if (username) {
            //如果说在某个房间内的话那么他说的话只会说给房间内的人听
            if (rooms.length > 0) {
                for (let i = 0; i < rooms.length; i++) {
                    //在此处我要判断是私聊还是公聊
                    let result = message.match(/@([^ ]+) (.+)/);
                    if (result) {
                        let toUser = result[1];
                        let content = result[2];
                        sockets[toUser].send({
                            username,
                            content,
                            createAt: new Date()
                        });
                    } else {
                        io.in(rooms[i]).emit('message', {
                            username,
                            content: message,
                            createAt: new Date()
                        });
                    }

                }
            } else {
                //如果此用户不在任何一个房间内的话需要全局广播 
                let result = message.match(/@([^ ]+) (.+)/);
                if (result) {
                    let toUser = result[1];
                    let content = result[2];
                    sockets[toUser].send({
                        username,
                        content,
                        createAt: new Date()
                    });
                } else {
                    io.emit('message', {
                        username,
                        content: message,
                        createAt: new Date()
                    });
                }


            }
        } else {
            //如果用户名还没有设置过，那说明这是这个用户的第一次发言
            username = message;
            //在对象中缓存 key是用户名 值是socket
            sockets[username] = socket;
            socket.broadcast.emit('message', {
                username: '系统',
                content: `<a>${username}</a> 加入了聊天`,
                createAt: new Date()
            });
        }


    });
    //监听客户端发过来的join类型的消息,参数是要加入的房间名
    socket.on('join2', function (roomName) {
        let oldIndex = rooms.indexOf(roomName);
        if (oldIndex == -1) {
            socket.join(roomName);//相当于这个socket在服务器端进入了某个房间 
            rooms.push(roomName);
        }
    })
    //当客户端告诉服务器说要离开的时候，则如果这个客户端就在房间内，则可以离开这个房间
    socket.on('leave3', function (roomName) {
        let oldIndex = rooms.indexOf(roomName);
        if (oldIndex != -1) {
            socket.leave(roomName);
            rooms.splice(oldIndex, 1);
        }
    });
    socket.on('getRoomInfo', function () {
        console.log(io);
        //let rooms = io.manager.rooms;
        console.log(io);
    });
});
// io.of('/goods').on('connection', function (socket) {
//     //监听客户端发过来的消息
//     socket.on('message', function (message) {
//         socket.send('goods:' + message);
//     });
// });

server.listen(8080);
/**
 * 1. 可以把服务分成多个命名空间，默认/,不同空间内不能通信
 * 2. 可以把一个命名空间分成多个房间，一个客户端可以同时进入多个房间。
 * 3. 如果大大厅里广播 ，那么所有在大厅里的客户端和任何房间内的客户端都能收到消息。
 */