const cheerio = require('cheerio');
let html = `
<h2 class="title">
Hello world
</h2>
`;
let $ = cheerio.load(html);
let t = $('h2.title');
t.text('ko');
t.addClass('welcome');
console.log(t.hasClass('welcome'))
console.log($('h2.title').html());
