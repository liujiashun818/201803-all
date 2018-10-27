const express = require('express');
const path = require('path');
const app = express();
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.sendFile(path.resolve(__dirname, 'long.html'));
});
// app.get('/clock', function (req, res) {
//     console.log(req.url, new Date().toLocaleString());
//     let timer = setInterval(function () {
//         let nowDate = new Date();
//         let secord = nowDate.getSeconds();//当前是多少秒
//         if (secord % 10 == 0) {
//             clearInterval(timer);
//             res.send(nowDate.toLocaleString());
//         }
//     }, 1000);
// });
app.get('/clock', function (req, res) {
    // console.log(req.url, new Date().toLocaleString());
    // let timer = setTimeout(function () {
    //     res.send(new Date().toLocaleString());
    // }, 5000);
    //10ms  1s 1 100次
    res.send(new Date().toLocaleString());
});
app.listen(8080);