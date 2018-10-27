let key = 'no9Gdsav5X9CDanU//FjdA==';
let secret = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto');
let result = crypto.createHash('sha1')
    .update(key + secret)
    .digest('base64');
console.log(result);
//ajD5uJTIYDHpBNMXv8lFx09N1Ko=
//ajD5uJTIYDHpBNMXv8lFx09N1Ko=