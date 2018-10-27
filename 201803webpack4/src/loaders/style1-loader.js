//创建一个style标签，然后把CSS内容放到里面，然后把这个style标签插入到head中
let loader = function (source) {
    let style = `
     var style = document.createElement("style");
     style.innerHTML = ${JSON.stringify(source)};
     document.head.appendChild(style);
  `;
    return style;
}
let loaderUtils = require('loader-utils');
//pitch里的参数可不是文件内容，而是文件的请求路径
//pitch request就是你要加载的文件路径 //index.less
loader.pitch = function (request) {
    console.log(request);
    let style = `
    var style = document.createElement("style");
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, "!!" + request)});
    document.head.appendChild(style);
 `;
    return style;
}
module.exports = loader;