const express = require('express');
const path = require('path');
const app = express();
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.sendFile(path.resolve(__dirname, 'polling.html'));
});
app.get('/clock', function (req, res) {
    res.send(new Date().toLocaleString());
});
app.listen(8080);