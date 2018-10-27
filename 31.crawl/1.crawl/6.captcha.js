const request = require('request');
const fs = require('fs');
let url = 'https://www.douban.com/misc/captcha?id=uRYhKrHqFFMGdVj7o1xPnW0n:en&size=s';
let options = {
    url,
    encoding: null,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
    }
}
request(options, (err, response, body) => {
    console.log(body);
    fs.writeFileSync('a.jpg', body);
});