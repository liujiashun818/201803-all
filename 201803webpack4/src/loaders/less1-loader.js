/**
 * 插件要尽可以有简单，独立
 */
let less = require('less');
let loader = function (source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        callback(err, `module.exports = ${JSON.stringify(output.css)}`);
        //callback(err, output.css);
    });
}

module.exports = loader;

/**
 * 分割CSS代码
 *  link href 
 * 有些时间我们希望less-loader可以放在use数组最左边，最左边要求返回一个JS脚本
 * 
 */