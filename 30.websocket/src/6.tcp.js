let net = require('net');
let crypto = require('crypto');
let SECRET = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
//创建一个TCP的服务器，并监听8888端口
let server = net.createServer(function (socket) {
    //监听第一次客户端发过来的消息
    socket.once('data', function (data) {
        data = data.toString();
        let lines = data.split('\r\n');
        let headerStr = lines.slice(1, -2);
        let headers = {};
        headerStr.forEach(str => {
            let [key, value] = str.split(': ');
            headers[key] = value;
        });
        if (headers['Connection'] == 'Upgrade' && headers['Upgrade'] == 'websocket') {
            let key = headers['Sec-WebSocket-Key'];
            let accept = require('crypto').createHash('sha1').update(key + SECRET).digest('base64');
            let response = [
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                "Connection: Upgrade",
                `Sec-WebSocket-Accept: ${accept}`,
                '\r\n'
            ]
            socket.write(response.join('\r\n'));
            //从这开始就开始监听websocket协议的数据了
            socket.on('data', function (data) {
                //判断是否是结束位
                let _fin = (data[0] & 0b10000000) == 0b10000000;
                let _opcode = data[0] & 0b00001111;
                let _isMask = (data[1] & 0b10000000) == 0b10000000;
                let _payloadLength = data[1] & 0b01111111;
                let _maskKey = data.slice(2, 6);// 2 3 4 5 
                let payloadData = data.slice(6);

                unmask(payloadData, _maskKey);

                console.log(_fin, _opcode, _isMask, _payloadLength, _maskKey, payloadData.toString());

                let response = Buffer.alloc(2 + _payloadLength);
                response[0] = _opcode | 0b10000000;;
                response[1] = _payloadLength;
                payloadData.copy(response, 2);
                socket.write(response);
            });
        }
    });
});
function unmask(data, mask) {
    for (let i = 0; i < data.length; i++) {
        data[i] ^= mask[i & 3];
    }
}
server.listen(8888);
/**
 0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
 */
/**
GET ws://127.0.0.1:8888/ HTTP/1.1
Host: 127.0.0.1:8888
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Origin: http://127.0.0.1:8080
Sec-WebSocket-Version: 13
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: locale=en-us
Sec-WebSocket-Key: SOROPWcJMym7NT/HssD9yA==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: KNEthHg/5vokm4E5bCziBjFMFuc=




xx
 */