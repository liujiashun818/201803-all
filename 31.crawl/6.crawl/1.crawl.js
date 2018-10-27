let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let options = {
    url: 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',
    encoding: null
}
request(options, (err, response, body) => {
    console.log(body);
    let str = iconv.decode(body, 'gbk');
    let $ = cheerio.load(str);
    let movies = [];
    $('a.list-title').each(function (index, item) {
        let _this = $(item);
        movies.push(_this.text());
    });
    console.log(movies);
});