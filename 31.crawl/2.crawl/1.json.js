let request = require('request');
const fs = require('fs');
const path = require('path');
/* let options = {
    url: 'http://localhost:8080/signup',
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': "application/json"
    },
    body: { "id": 1, "name": "zfpx1" }
}
request(options, function (err, response, body) {
    console.log(body);
}); */

/* let options = {
    url: 'http://localhost:8080/signup',
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': "application/x-www-form-urlencoded"
    },
    //表单格式 id=1&name=zfpx1
    form: { "id": 1, "name": "zfpx1" }
}
request(options, function (err, response, body) {
    console.log(body);
}); */

let formData = {
    name: 'zfpx',
    age: 9,
    avatar: {
        value: fs.createReadStream(path.resolve(__dirname, 'a.jpg')),
        options: {
            contentType: 'image/jpeg'
        }
    }
}
let options = {
    url: 'http://localhost:8080/signup',
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': "multipart/form-data"
    },
    //表单格式 id=1&name=zfpx1
    formData
}
request(options, function (err, response, body) {
    console.log(err);
    console.log(body);
});