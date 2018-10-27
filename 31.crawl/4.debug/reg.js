let str = 'crawl:*';
let regStr = str.replace(/\*/g, function () {
    return ".*";
});
console.log(regStr);
let regexp = new RegExp(regStr);
console.log(regexp.test('crawl:my1'));
console.log(regexp.test('crawl:my2'));