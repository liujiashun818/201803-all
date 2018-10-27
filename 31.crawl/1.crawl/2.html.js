let request = require('request');
let fs = require('fs');
let options = {
    url: 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF'
}
request(options, (err, response, html) => {
    //console.log(html);
    let regexp = /class="title" data-v-\w+>(.+?)<\/a>/g;
    let titles = [];
    html.replace(regexp, (matched, title) => {
        titles.push(title);
    });
    console.log(titles);
    /*   fs.writeFile('tag.html', body, (err) => {
          console.log(err)
      }); */
});