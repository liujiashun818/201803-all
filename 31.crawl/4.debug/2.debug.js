let debug = require('./debug');
const mydebug = debug('crawl:2debug');
function sum(...args) {
    mydebug('mylog');
    return args.reduce((val, item) => {
        return val + item;
    }, 0);
}
let ret = sum(1, 2, 3);
console.log(ret);