const nodemailer = require('nodemailer');
//设置发件人
let transporter = nodemailer.createTransport({
    service: 'qq',//服务
    port: 465,//端口号
    secureConnection: true,//使用加密连接
    auth: {
        user: '83687401@qq.com',//配置邮箱
        pass: 'gddqvytadxyncafg'//配置授权码，授权码需要在邮件客户端里生成
    }
});
//指定收件人
let mailOptions = {
    from: '83687401@qq.com',
    to: '83687401@qq.com',
    subject: '这是邮件标题',
    html: '<h1>这是邮件的正文</h1>'
}
transporter.sendMail(mailOptions, (err, info) => {
    console.log(err);
    console.log(info);
});