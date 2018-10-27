let express = require('express');
let path = require('path');
let app = express();
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
let server = require('http').createServer(app);
let io = require('socket.io')(server);
server.listen(8000);