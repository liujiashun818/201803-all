const chalk = require('chalk');
let colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'gray'];
//console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
function debug(name) {
    return function (...args) {
        const start = Date.now();
        let d = process.env.DEBUG;//这是从环境变量中拿到的值，这值可能会包含星号
        if (d.includes('*')) {
            let regStr = d.replace(/\*/g, function () {
                return ".*";
            });
            let regexp = new RegExp(regStr);
            if (!regexp.test(name)) {
                return;
            }
        } else {
            if (name != process.env.DEBUG) {
                return;
            }
        }
        console.log.call(console, chalk[colors[Math.floor(Math.random() * 7)]]("  " + name), chalk[colors[Math.floor(Math.random() * 7)]](...args), chalk[colors[Math.floor(Math.random() * 7)]](`+${Date.now() - start}ms`));
    }
}

module.exports = debug;