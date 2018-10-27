const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({
    dest: 'uploads'
});
const app = express();
//这个中间件只会处理json格式的请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', upload.single('avatar'), function (req, res) {
    let file = req.file;//放置上传的文件信息
    let user = req.body;//放置的是除了此文件之外的其它字段信息
    res.send(user);
});
app.listen(8080);